$(document).ready(function(){

var city = "philadelphia" //$(this).attr("data-name");
var lat = "-75"
var lon = "39"

// Constructing a queryURL using the city name
var queryURLDaily = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ac397bc3c44a88b8f39a86ff30ffc0cc";
var queryURL5Day = "https://api.openweathermap.org/data/2.5/onecall?q=" + city + "&appid=ac397bc3c44a88b8f39a86ff30ffc0cc";
// Constructing a queryURL using the lon & lat 
var queryURLUVIndex =  "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=ac397bc3c44a88b8f39a86ff30ffc0cc";

// adds date to the current day card of the weather app using the moment.js library tool and connecting to the id in the HTML
var todaysDate = moment().format('L');
$("#currentDay").text(todaysDate);

// adds dates to top of 5 day forecast cards using the moment.js library tool and connecting to the id in the HTML
var todaysDate = moment().format('L');
$("#day1Day").text(todaysDate);
var day2Date = moment().add(1, 'days').calendar('L');;
$("#day2Day").text(day2Date);
var day3Date = moment().add(2, 'days').calendar('L');;
$("#day3Day").text(day3Date);
var day4Date = moment().add(3, 'days').calendar('L');;
$("#day4Day").text(day4Date);
var day5Date = moment().add(4, 'days').calendar('L');;
$("#day5Day").text(day5Date);



// // Adding click event listener to all buttons
// $("#citySearch").on("click", function() {
// // Grabbing and storing the data-city property value from the button
//     var city = $(this).attr("#city-input");
//     localStorage.setItem("city: ", city);
//     console.log(localStorage)
//     console.log(city)
// })

// var temperatureF = $("<p>").text("Temperature: " + Math.round(((parseInt(temperatureK)-273.15)*1.8)+32));

// gets textarea input values by class and id to store in local storage 
$(".city").val(localStorage.getItem("city: "));

// function displayWeatherInfo() {

    // Performing an AJAX request with the queryURLDaily
    $.ajax({
      url: queryURLDaily,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        // var weatherIcon = $("<img>")
        // weatherIcon.attr("src", response.weather.icon);
        // var weatherIcon = $("<p>").text(response.weather.icon);
        
        var temperatureK = response.main.temp;
        
       
        $(".today").append(cityName);
        //$(".today").append(weatherIcon);
        $(".today").append(temperatureF);
        $(".today").append(humidity);
        $(".today").append(windSpeed);
        // Performing an AJAX request with the queryURLUVIndex
        $.ajax({
            url: queryURLUVIndex,
            method: "GET"
        })
            // After data comes back from the request
            .then(function(response) {
            var UVIndex = $("<p>").text("UV Index: " + response.value);
            $(".today").append(UVIndex);
        });
        return lat, lon;
    });
    
    // Performing an AJAX request with the queryURL5Day
   
          //console.log(response.weather.icon);
        //   console.log(response.main.temp);
        //   console.log(response.main.humidity);
        // var weatherIcon = $("<img>")
        // weatherIcon.attr("src", response.weather.icon);
        // $(".today").append(weatherIcon);

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating a paragraph tag with the result item's temp and humidity
            var temp = $("<p>").text("Temperature: " + response[i].main.temp);
            var humidity = $("<p>").text("Humidity: " + response[i].main.humidity);

            // Appending the paragraph and image tag to the forecast ID
            $("#forecast").append(temp);
            $("#forecast").append(humidity);
          }
        });

    });    


// Function for displaying movie data
function renderButtons() {

    // Deleting the cities prior to adding new cities
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    var cities = [];

    // Looping through the array of cities
    for (var i = 0; i < cities.length; i++) {

      // Then dynamicaly generating buttons for each city in the array
      var a = $("<button>");
      // Adding a class of city-btn to our button
      a.addClass("city-btn");
      // Adding a data-attribute
      a.attr("data-name", cities[i]);
      // Providing the initial button text
      a.text(cities[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
}

// This function handles events where a city button is clicked
$("#citySearch").on("click", function(event) {
event.preventDefault();
// This line grabs the input from the textbox
var city = $("#city-input").val().trim();

// Adding city from the textbox to our array
cities.push(city);

// Calling renderButtons which handles the processing of our cities array
renderButtons();

});

// Adding a click event listener to all elements with a class of "city-btn"
//$(document).on("click", ".city-btn", displayWeatherInfo);

// Calling the renderButtons function to display the initial buttons   
renderButtons();

//questions:
// how do I cycle through the 5 day forecast to attach the data needed to my boxes?
// why are my row/columns looking so off?
// how do I save and prepend the last searches and make them buttons I can search again?
// how do I get the icons to appear again? 

