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

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feelsLike");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let timeElement = document.querySelector("#time");

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  countryElement.innerHTML = response.data.country;
  descriptionElement.innerHTML = response.data.condition.description;

  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);

  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);

  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);

  timeElement.innerHTML = formatTime(response.data.time * 1000);
}

let apiKey = "333f557et08fd3a7702f775fo4452b95";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=London&key=333f557et08fd3a7702f775fo4452b95&units=metric";

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
