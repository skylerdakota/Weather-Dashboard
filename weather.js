$(document).ready(function () {


    $("#citySearch").on("click", function () {
        var queryTerm = $("#city-input").val().trim();

        searchWeather(queryTerm)



    })

    function searchWeather(city) {
        var queryURLDaily = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ac397bc3c44a88b8f39a86ff30ffc0cc&units=imperial";

        $.ajax({
            url: queryURLDaily,
            method: "GET",
            dataType: "json"
        })
            // After data comes back from the request
            .then(function (response) {
                var card = $("<div>").addClass("card");
                var cardBody = $("<div>").addClass("card-body")
                var cardTitle = $("<h3>").addClass("card-title").text(response.name)
                var todaysDate = $("<p>").addClass("card-text").text(moment().format('L'));
                var windSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " mph");
                var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + String.fromCharCode(37));
                var temp = Math.round(response.main.temp);
                var tempEl = $("<p>").addClass("card-text").text("Temp: " + temp + String.fromCharCode(176) + "F")

                $("#today").append(card.append(cardBody.append(cardTitle, todaysDate, windSpeed, humidity, tempEl)))

                var lat = response.coord.lat;
                var lon = response.coord.lon;

                getForecast(lat, lon);
            })
    };

    function getForecast(lat, lon){
        var queryURL5Day = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=ac397bc3c44a88b8f39a86ff30ffc0cc&units=imperial";
        $.ajax({
            url: queryURL5Day,
            method: "GET",
            dataType: "json"
          })
            // After data comes back from the request
            .then(function(response) {
              console.log(response);

              var card = $("<div>").addClass("card");
              var cardBody = $("<div>").addClass("card-body")
              var UVIndex = $("<p>").addClass("card-text").text("UV Index: " + response.current.uvi);

              if (UVIndex > 7){
                $(cardBody).addClass("poor");
              } else if (UVIndex < 2){
                $(cardBody).addClass("good");
              } else{
                $(cardBody).addClass("fair");
              }

              $("#today").append(card.append(cardBody.append(UVIndex)))
           

              for(var i = 1; i < 6; i++) {
                  var col = $("<div>").addClass("col-2")
                  var card = $("<div>").addClass("card");
                  var cardBody = $("<div>").addClass("card-body")
                  var date = moment.unix(response.daily[i].dt).format('L')
                  var dateEl = $("<h6>").addClass("card-title").text(date)
                  var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.daily[i].humidity + String.fromCharCode(37));
                  var temp = Math.round(response.daily[i].temp.day);
                  var tempEl = $("<p>").addClass("card-text").text("Temp: " + temp + String.fromCharCode(176) + "F")

                  $("#forecast").append(col.append(card.append(cardBody.append(dateEl, tempEl, humidity))))

              }
    
            })
    }
})
