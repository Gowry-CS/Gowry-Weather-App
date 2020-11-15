function formatDate(date) {
  let days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
  ];

  let months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER"
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let formattedDate = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;
  return formattedDate;
}
let displayedDate = document.querySelector("#display-date");
displayedDate.innerHTML = formatDate(new Date());

function formatTime(time) {
  let currentHour = time.getHours();
  let currentMinute = time.getMinutes();
  let formattedTime = `${currentHour}:${currentMinute}`;
  return formattedTime;
}

let displayedTime = document.querySelector("#display-time");
displayedTime.innerHTML = formatTime(new Date());

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let temperatureMin = document.querySelector("#min-temp");
  let temperatureMax = document.querySelector("#max-temp");
  let currentCity = document.querySelector("#display-city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity-value");
  let windspeed = document.querySelector("#wind-value");
  let pressure = document.querySelector("#pressure-value");
  temperatureElement.innerHTML = `${temperature}`;
  currentCity.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  temperatureMax.innerHTML = Math.round(response.data.main.temp_max);
  temperatureMin.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  windspeed.innerHTML = Math.round(response.data.wind.speed);
  pressure.innerHTML = Math.round(response.data.main.pressure);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "a81de93f2b2c22789e9a9561cb83e211";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let searchedCity = document.querySelector("#search-button");
searchedCity.addEventListener("click", showCity);

function showCurrentPosition(position) {
  let apiKey = `a81de93f2b2c22789e9a9561cb83e211`;
  let latNumber = position.coords.latitude;
  let longNumber = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latNumber}&lon=${longNumber}&appid=${apiKey}
&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentButton = document.querySelector("#display-current-city");
currentButton.addEventListener("click", getCurrentPosition);
