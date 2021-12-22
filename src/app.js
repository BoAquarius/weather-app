function showToday(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let timeNow = `${hour}:${minutes}`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dayNow = days[date.getDay()];
  let dateNow = date.getDate();
  let monthNow = months[date.getMonth()];
  let yearNow = date.getFullYear();

  return `${dayNow}, ${dateNow} ${monthNow} ${yearNow} - ${timeNow}`;
}

let dateToday = document.querySelector("#date-today");
let now = new Date();
dateToday.innerHTML = showToday(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
        <div class="col-2">
              <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
              <span class="forecast-max-temp">${Math.round(
                forecastDay.temp.max
              )}°C</span>
              <span class="forecast-temp-divider"> | </span>
              <span class="forecast-min-temp">${Math.round(
                forecastDay.temp.min
              )}°C</span>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              class="forecast-icon"/>
              <h4 class="forecast-description">${
                forecastDay.weather[0].description
              }</h4>
        </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let units = "metric";
  let apiKey = "9a9b131f757f5f5e890f4825be8ec528";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let currentCityName = document.querySelector("h1");
  currentCityName.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].main;

  celsiousTemperature = response.data.main.temp;

  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = Math.round(celsiousTemperature);
  fahrenheitLink.classList.remove("active-units");
  celsiousLink.classList.add("active-units");

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "9a9b131f757f5f5e890f4825be8ec528";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;

  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
document.querySelector("#search-form").reset();

let citySubmitButton = document.querySelector("#city-submit-button");
citySubmitButton.addEventListener("click", handleSubmit);

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "9a9b131f757f5f5e890f4825be8ec528";
  let apiUrlPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlPosition).then(displayWeather);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function showTemperatureFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  celsiousLink.classList.remove("active-units");
  fahrenheitLink.classList.add("active-units");
  let fahrenheitTemperature = (celsiousTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showTemperatureCelsious(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  fahrenheitLink.classList.remove("active-units");
  celsiousLink.classList.add("active-units");
  temperatureElement.innerHTML = Math.round(celsiousTemperature);
}

let celsiousTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showTemperatureFahrenheit);

let celsiousLink = document.querySelector("#celsious");
celsiousLink.addEventListener("click", showTemperatureCelsious);

searchCity("Brussels");
