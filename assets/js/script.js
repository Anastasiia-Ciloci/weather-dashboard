//dd2da97a8834a8df57f21fda8fe21bdc

//fetch url
var appId = "appid=dd2da97a8834a8df57f21fda8fe21bdc";
var cityNameUrl = "https://api.openweathermap.org/data/2.5/weather?";
/*"https://api.openweathermap.org/data/2.5/weather?q=virginia%20beach&appid=dd2da97a8834a8df57f21fda8fe21bdc&units=imperial";*/

var coordUrl = "https://api.openweathermap.org/data/2.5/onecall?";
/*"https://api.openweathermap.org/data/2.5/onecall?lat=36.845131&lon=-75.975441&appid=dd2da97a8834a8df57f21fda8fe21bdc&units=imperial";*/

var latitude = 36.845131;
var longitude = -75.975441;

fetch(cityNameUrl + "q=virginia%20beach&" + appId + "&units=imperial")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var lon = data.coord.lon;
    var lat = data.coord.lat;
    //console.log(lon);
    fetch(
      coordUrl + "lat=" + lat + "&lon=" + lon + "&" + appId + "&units=imperial"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (weatherData) {
        console.log(weatherData);
        console.log("todays temp is:", weatherData.current.temp);
        printWeather(weatherData);
      });
  })
  .catch(function (err) {
    console.log(err);
  });

var printWeather = function (weatherData) {
  var currentTemp = weatherData.current.temp;
  var currentHumid = weatherData.current.humidity;
  var currentUvi = weatherData.current.uvi;
  var currentWind = weatherData.current.wind_speed;
  $("#temp").text(currentTemp + " °F");
  $("#humidity").text(currentHumid + " %");
  $("#uvInd").text(currentUvi);
  $("#wind").text(currentWind + " MPH");

  console.log("function works", currentHumid);
};

//declaring all var
var searchBtnEl = document.querySelector("#searchBtn");
var searchInputEl = document.querySelector("#searchInput");
var cityListEl = document.querySelector("#cityList");
var currentResultEl = document.querySelector("#currentResult");
var fiveDayEl = document.querySelectorAll("#forecastDivInfo");
var currentDayEl = document.querySelector("#currentDay");
var currentCityEl = document.querySelector("#currentCity");

//time
var today = moment();
$("#currentDay").text(today.format("L"));

//var currentTemp = data.

//var renderSearchedInfo = function () {};
