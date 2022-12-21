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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
           ${day}
        <img src="images/rainy.svg" alt="" width="60px"> 
        <span class="forecast-temp-max"> 19 </span> 
        <span class="forecast-temp-min"> 11 </span> 
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

  displayForecast();

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
function displayCTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

function displayFtemp(event) {
  event.preventDefault();
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemp);
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
}

let celsiusTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCTemp);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFtemp);

search("London");
