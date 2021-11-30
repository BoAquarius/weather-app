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

function displayWeather(response) {
  let currentCityName = document.querySelector("h1");
  currentCityName.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].main;

  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

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

searchCity("Brussels");

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
