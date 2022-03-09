//declaring all var
var searchBtnEl = document.querySelector("#searchBtn");
var searchInputEl = document.querySelector("#searchInput");
var cityListEl = document.querySelector("#cityList");
var currentResultEl = document.querySelector("#currentResult");
var fiveDayEl = document.querySelectorAll("#forecastDivInfo");
var currentDayEl = document.querySelector("#currentDay");
var currentCityEl = document.querySelector("#currentCity");
//fetch url
var appId = "appid=dd2da97a8834a8df57f21fda8fe21bdc";
var cityNameUrl = "https://api.openweathermap.org/data/2.5/weather?";
/*"https://api.openweathermap.org/data/2.5/weather?q=virginia%20beach&appid=dd2da97a8834a8df57f21fda8fe21bdc&units=imperial";*/

var coordUrl = "https://api.openweathermap.org/data/2.5/onecall?";
/*"https://api.openweathermap.org/data/2.5/onecall?lat=36.845131&lon=-75.975441&appid=dd2da97a8834a8df57f21fda8fe21bdc&units=imperial";*/

// var latitude = 36.845131;
// var longitude = -75.975441;
function getCityWeather(cityName) {
  fetch(cityNameUrl + "q=virginia%20beach&" + appId + "&units=imperial")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      fetch(
        coordUrl +
          "lat=" +
          lat +
          "&lon=" +
          lon +
          "&" +
          appId +
          "&units=imperial"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (weatherData) {
          console.log(weatherData);
          console.log("todays temp is:", weatherData.current.temp);
          printWeather(weatherData);
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
}
var printWeather = function (weatherData) {
  var currentTemp = weatherData.current.temp;
  var currentHumid = weatherData.current.humidity;
  var currentUvi = weatherData.current.uvi;
  var currentWind = weatherData.current.wind_speed;
  $("#temp").text(currentTemp + " °F");
  $("#humidity").text(currentHumid + " %");
  $("#uvInd").text(currentUvi);
  $("#wind").text(currentWind + " mph");

  var days = weatherData.daily;
  for (var i = 0; i < 5; i++) {
    var date = moment.unix(days[i].dt).format("MM/DD/YYYY");
    var humidity = days[i].humidity;
    var t = days[i].temp.day;
    var wind = days[i].wind_speed;

    $("#day" + i + " span:first-child").text(date);
    $("#day" + i + " p:nth-child(2)").text("Temp: " + t + "°F");
    $("#day" + i + " p:nth-child(3)").text("Wind: " + wind + " mph");
    $("#day" + i + " p:nth-child(4)").text("Humidity: " + humidity + "%");
  }

  console.log("function works", currentHumid);
};

//time
var today = moment();
$("#currentDay").text(today.format("L"));

searchBtnEl.addEventListener("click", getCityWeather);

//var renderSearchedInfo = function () {};
