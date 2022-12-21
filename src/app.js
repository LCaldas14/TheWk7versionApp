let now = new Date();
let date = now.getDate();
if (date < 10) {
  date = `0${date}`;
}
let year = now.getFullYear();
let days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];
let day = days[now.getDay()];
let months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
let month = months[now.getMonth()];

let h1 = document.querySelector("h1");
h1.innerHTML = ` ${day} ${date} , ${month} ${year}`;

function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
           ${formatForecastDay(forecastDay.time)} 
        <img src ="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecast[0].condition.icon
        }.png"
         alt="weather-icon" width="60px" /> 
        <span class="forecast-temp-max"> ${Math.round(
          forecastDay.temperature.maximum
        )}°</span> 
        <span class="forecast-temp-min"> ${Math.round(
          forecastDay.temperature.minimum
        )}°</span> 
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "333f557et08fd3a7702f775fo4452b95";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feelsLike");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.city;
  countryElement.innerHTML = response.data.country;
  descriptionElement.innerHTML = response.data.condition.description;

  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);

  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);

  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);

  timeElement.innerHTML = formatTime(response.data.time * 1000);

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "333f557et08fd3a7702f775fo4452b95";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("London");
