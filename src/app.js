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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sepember",
    "October",
    "November",
    "December",
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
        <div class="col-2">
              <div class="forecast-day">${day}</div>
              <span class="forecast-max-temp">11°C</span>
              <span class="forecast-temp-divider"> | </span>
              <span class="forecast-min-temp">7°C</span>
              <h1>🌧</h1>
              <h4 class="forecast-description">Cloudy</h4>
        </div>`;
  });

  // forecastHTML = forecastHTML + forecastHTML;
  forecastElement.innerHTML = forecastHTML;
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

  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = response.data.sys.sunrise;

  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = response.data.sys.sunset;

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

displayForecast();
