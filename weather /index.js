// Api key for weather api
const apiKey = "40e8bc84aa5617fb32b224eb6623da34";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
let icon = document.querySelector(".icon");
let loaderContainer = document.querySelector(".loader");
const search = document.querySelector(".search");

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

// This function used for fetching weather details for user location if any location is not entered manually.
async function checkWeatherForUserLocation(pos) {
  const crd = pos.coords;

  let latitude = crd.latitude;
  let longitude = crd.longitude;
  console.log(latitude, longitude);

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  );
  var weather = await response.json();
  if (!weather) {
    loaderContainer.style.display = "block";
  } else {
    loaderContainer.style.display = "none";
    search.style.visibility = "visible";
  }
  const newDate = new Date();
  const time = newDate.getTime();
  const localOffset = newDate.getTimezoneOffset() * 60000;
  const utc = time + localOffset;
  const timezone = utc + 1000 * weather.timezone;

  const cityTimeZone = new Date(timezone);
  const hours = cityTimeZone.getHours();
  const isDayTime = hours >= 6 && hours <= 15;
  const isEveningTime = hours >= 16 && hours <= 20;
  const isNightTime = hours > 20 || hours < 6;

  let h1 = document.querySelector(".city");
  h1.innerText = weather.name;
  let temp = document.querySelector(".temp");
  temp.innerText = Math.round(weather.main.temp) + "°c" + "|";
  let feels = document.querySelector(".feels");
  feels.innerText = "Feels like " + Math.round(weather.main.feels_like) + "°C";
  let mintemp = document.querySelector(".min-temp");
  mintemp.innerText =
    " Min.temp" + ": " + Math.round(weather.main.temp_min) + "°C";
  let maxtemp = document.querySelector(".max-temp");
  maxtemp.innerText =
    " Max.temp" + " : " + Math.round(weather.main.temp_max) + "°C";
  let humidity = document.querySelector(".humidity");
  humidity.innerText =
    " " + "Humidity" + " : " + Math.round(weather.main.humidity) + "%";
  let wind = document.querySelector(".wind");
  wind.innerText =
    " " + "Wind" + " : " + Math.round(weather.wind.speed) + " " + "km/h";
  let typ = document.querySelector(".type");
  typ.innerText = weather.weather[0].description;
  let sunrise = document.querySelector(".sunrise");
  let sunRiseTime = moment
    .utc(weather.sys.sunrise, "X")
    .add(weather.timezone, "seconds")
    .format("HH:mm a");
  sunrise.innerText = " Sunrise : " + sunRiseTime;
  let sunset = document.querySelector(".sunset");
  let sunSetTime = moment
    .utc(weather.sys.sunset, "X")
    .add(weather.timezone, "seconds")
    .format("HH:mm a");
  sunset.innerText = " Sunset : " + sunSetTime;
  let pressure = document.querySelector(".pressure");
  pressure.innerText =
    "Pressure" + " : " + Math.round(weather.main.pressure) + " " + "hPa";
  let sealvl = document.querySelector(".sea-lvl");
  sealvl.innerText =
    "Sea-level" + " : " + Math.round(weather.main.sea_level) + " " + "m";

  if (weather.weather[0].main == "Clouds") {
    icon.src = "./assets/clouds.png";
  }
  if (weather.weather[0].main == "Clear") {
    icon.src = "./assets/clear.png";
  }
  if (weather.weather[0].main == "Drizzle") {
    icon.src = "./assets/drizzle.png";
  }
  if (weather.weather[0].main == "Drizzle") {
    icon.src = "./assets/drizzle.png";
  }
  if (weather.weather[0].main == "Mist") {
    icon.src = "./assets/mist.png";
  }
  if (weather.weather[0].main == "Snow") {
    icon.src = "./assets/snow.png";
  }
  if (isDayTime) {
    document.body.style.backgroundImage = "url('./assets/day.jpg')";
  }
  if (isNightTime) {
    document.body.style.backgroundImage = "url('./assets/night.jpg')";
  }
  if (isEveningTime) {
    document.body.style.backgroundImage = "url('./assets/evening.jpeg')";
  }
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

if (!searchBox.value) {
  navigator.geolocation.getCurrentPosition(checkWeatherForUserLocation, error, options);
}
// This function  used  for fetching  weather details for enterd location  in  the search box manually.
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);

  // time
  const newDate = new Date();
  const time = newDate.getTime();
  const localOffset = newDate.getTimezoneOffset() * 60000;
  const utc = time + localOffset;
  const timezone = utc + 1000 * data.timezone;

  const cityTimeZone = new Date(timezone);
  const hours = cityTimeZone.getHours();
  const isDayTime = hours >= 6 && hours <= 15;
  const isEveningTime = hours >= 16 && hours <= 20;
  const isNightTime = hours > 20 || hours < 6;

  let h1 = document.querySelector(".city");
  h1.innerText = data.name;
  let temp = document.querySelector(".temp");
  temp.innerText = Math.round(data.main.temp) + "°c" + "|";
  let feels = document.querySelector(".feels");
  feels.innerText = "Feels like " + Math.round(data.main.feels_like) + "°C";
  let mintemp = document.querySelector(".min-temp");
  mintemp.innerText = " Min.temp" + " " + Math.round(data.main.temp_min) + "°C";
  let maxtemp = document.querySelector(".max-temp");
  maxtemp.innerText = " Max.temp" + " " + Math.round(data.main.temp_max) + "°C";
  let humidity = document.querySelector(".humidity");
  humidity.innerText =
    " " + "Humidity" + " " + Math.round(data.main.humidity) + "%";
  let wind = document.querySelector(".wind");
  wind.innerText =
    " " + "Wind" + " " + Math.round(data.wind.speed) + " " + "km/h";
  let typ = document.querySelector(".type");
  typ.innerText = data.weather[0].main;
  let sunrise = document.querySelector(".sunrise");
  let sunRiseTime = moment
    .utc(data.sys.sunrise, "X")
    .add(data.timezone, "seconds")
    .format("HH:mm a");
  sunrise.innerText = " Sunrise : " + sunRiseTime;
  let sunset = document.querySelector(".sunset");
  let sunSetTime = moment
    .utc(data.sys.sunset, "X")
    .add(data.timezone, "seconds")
    .format("HH:mm a");
  sunset.innerText = " Sunset : " + sunSetTime;
  let pressure = document.querySelector(".pressure");
  pressure.innerText =
    "Pressure" + " : " + Math.round(data.main.pressure) + " " + "hPa";
  let sealvl = document.querySelector(".sea-lvl");
  sealvl.innerText =
    "Sea-level" + " : " + Math.round(data.main.sea_level) + " " + "m";

  if (data.weather[0].main == "Clouds") {
    icon.src = "./assets/clouds.png";
  }
  if (data.weather[0].main == "Clear") {
    icon.src = "./assets/clear.png";
  }
  if (data.weather[0].main == "Drizzle") {
    icon.src = "./assets/drizzle.png";
  }
  if (data.weather[0].main == "Drizzle") {
    icon.src = "./assets/drizzle.png";
  }
  if (data.weather[0].main == "Mist") {
    icon.src = "./assets/mist.png";
  }
  if (data.weather[0].main == "Snow") {
    icon.src = "./assets/snow.png";
  }
  if (isDayTime) {
    document.body.style.backgroundImage = "url('./assets/day.jpg')";
  }
  if (isNightTime) {
    document.body.style.backgroundImage = "url('./assets/night.jpg')";
  }
  if (isEveningTime) {
    document.body.style.backgroundImage = "url('./assets/evening.jpeg')";
  }
}

searchBtn.addEventListener("click", (event) => {
  checkWeather(searchBox.value);
  event.target.value = "";
});
searchBox.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchBox.value);
    event.target.value = "";
  }
});
