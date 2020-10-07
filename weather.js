$(document).ready(function () {


    $("#citySearch").on("click", function () {
        var queryTerm = $("#city-input").val().trim();
        searchWeather(queryTerm);
        // Calling the renderButtons function to display the initial buttons   
        renderButtons();

    })

    function searchWeather(city) {
        $("#today").empty();
        // Constructing a queryURL using the city name
        var queryURLDaily = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ac397bc3c44a88b8f39a86ff30ffc0cc&units=imperial";
        $.ajax({
            url: queryURLDaily,
            method: "GET",
            dataType: "json"
        })
            // After data comes back from the request
            .then(function (response) {
                var card = $("<div>").addClass("card");
                var cardBody = $("<div>").addClass("card-body");
                var cardTitle = $("<h3>").addClass("card-title").text(response.name);
                // adds date to the current day card of the weather app using the moment.js library tool
                var todaysDate = $("<h6>").addClass("card-text").text(moment().format('L'));
                // var weatherIcon = $("<img>")
                // weatherIcon.attr("src", response.weather.icon);
                var windSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " mph");
                var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + String.fromCharCode(37));
                var temp = Math.round(response.main.temp);
                var tempEl = $("<p>").addClass("card-text").text("Temp: " + temp + String.fromCharCode(176) + "F")

                // Appending the divs, h3 and paragraph tags to the today ID
                $("#today").append(card.append(cardBody.append(cardTitle, todaysDate, windSpeed, humidity, tempEl)))

                var lat = response.coord.lat;
                var lon = response.coord.lon;

                getForecast(lat, lon);
            })
    };

    function getForecast(lat, lon) {
        $("#forecast").empty();
        // Constructing a queryURL using the lon & lat 
        var queryURL5Day = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=ac397bc3c44a88b8f39a86ff30ffc0cc&units=imperial";
        $.ajax({
            url: queryURL5Day,
            method: "GET",
            dataType: "json"
        })
            // After data comes back from the request
            .then(function (response) {

                var card = $("<div>").addClass("card");
                var cardBody = $("<div>").addClass("card-body");
                var UVIndex = $("<p>").addClass("card-text").text("UV Index: " + response.current.uvi);

                // Creating a condition to evaluate the UVIndex and add a class to display a color over the box to show the user information
                if (UVIndex > 7) {
                    $(cardBody).addClass("poor");
                } else if (UVIndex < 2) {
                    $(cardBody).addClass("good");
                } else {
                    $(cardBody).addClass("fair");
                }

                // Appending the divs and paragraph tags to the today ID
                $("#today").append(card.append(cardBody.append(UVIndex)))

                // Looping through each result item starting at 2nd item and capping it after 5 loops to create 5 days
                for (var i = 1; i < 6; i++) {
                    var col = $("<div>").addClass("col-2");
                    var card = $("<div>").addClass("card");
                    var cardBody = $("<div>").addClass("card-body");
                    // translates Unix time and reformats it and adds date to the current day card of the weather app using the moment.js library tool
                    var date = moment.unix(response.daily[i].dt).format('L');
                    var dateEl = $("<h6>").addClass("card-title").text(date);
                    var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.daily[i].humidity + String.fromCharCode(37));
                    var temp = Math.round(response.daily[i].temp.day);
                    var tempEl = $("<p>").addClass("card-text").text("Temp: " + temp + String.fromCharCode(176) + "F")

                    // Appending the divs, h6 and paragraph tags to the forecast ID
                    $("#forecast").append(col.append(card.append(cardBody.append(dateEl, tempEl, humidity))))

                }

            })
    };

    // Function for displaying city buttons
    function renderButtons(city) {

        var newButton = $("<button>");
        newButton.addClass("city-btn");
        var city = $("#city-input").val().trim();

        $(".history").append(newButton.append(city));
    };

    // // This function handles events where a city button is clicked
    // $(".city-btn").on("click", function(event) {
    // event.preventDefault();
    // // This line grabs the input from the button
    // var city = $("#city-btn").val();
    // searchWeather(city);
    // });

})
