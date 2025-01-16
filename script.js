const ApiKey = "668268a109c340356e0cd1374876cfe3";
const input = document.querySelector(".input");
const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const errorBox = document.querySelector(".error-box");
const windBox = document.querySelector(".wind-data-box");
const humidityBox = document.querySelector(".humidity-data-box");
const weatherDetails = document.querySelector(".weather-details");
const searchBtn = document.querySelector(".search-btn");
const weatherImg = document.querySelector(".weather-image");
const temperature = document.querySelector(".weather-temperature");
const description = document.querySelector(".weather-description");
const humidity = document.querySelector(".humidity-data");
const wind = document.querySelector(".wind-data");

// Functions
const renderImg = function (data) {
  switch (data.weather[0].main) {
    case "Clear":
      weatherImg.src = "images/clear.png";
      break;

    case "Rain":
      weatherImg.src = "images/rain.png";
      break;

    case "Snow":
      weatherImg.src = "images/snow.png";
      break;

    case "Clouds":
      weatherImg.src = "images/cloud.png";
      break;

    case "Mist":
      weatherImg.src = "images/mist.png";
      break;

    case "Haze":
      weatherImg.src = "images/mist.png";
      break;

    case "Fog":
      weatherImg.src = "images/mist.png";
      break;

    default:
      weatherImg.src = "";
      break;
  }
};

const renderMainData = function (data) {
  // Temperature
  temperature.innerHTML = `<p>${Number(data.main.temp).toFixed(
    0
  )}<span>°C</span></p>`;

  // Description
  description.innerHTML = ` <p>${data.weather[0].description}</p>`;
};

const renderMinorData = function (data) {
  // Render
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${Number(data.wind.speed).toFixed(0)} km/h`;
};

const renderData = function (data) {
  // Rendering Image
  renderImg(data);

  // Rendering Humidity And Wind
  renderMinorData(data);

  // Rendering Temperature And Description
  renderMainData(data);
};

const displaySuccessUI = function () {
  // Hide UI Error
  errorBox.classList.add("hidden");

  // Container Layout (Success)
  container.classList.remove("error");
  container.classList.add("active");

  // Display UI Weather Details
  weatherBox.classList.remove("hidden");
  weatherDetails.classList.remove("hidden");
};

const displayErrorUI = function () {
  // Container Layout (Error)
  container.classList.remove("active");
  container.classList.add("error");

  // Hide UI Weather Details
  weatherBox.classList.add("hidden");
  weatherDetails.classList.add("hidden");

  // Display UI Error
  errorBox.classList.remove("hidden");
};

const animateDown = function () {
  // Moving Data Down
  weatherImg.classList.add("animate");
  temperature.classList.add("animate");
  description.classList.add("animate");
  humidity.classList.add("animate");
  wind.classList.add("animate");
};

const animateUp = function () {
  //Moving Data Up
  weatherImg.classList.remove("animate");
  temperature.classList.remove("animate");
  description.classList.remove("animate");
  humidity.classList.remove("animate");
  wind.classList.remove("animate");
};

const UnfocusKeyboard = function () {
  input.blur();
};

const ApiCall = async function (e) {
  const country = input.value;
  console.log(country);
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${ApiKey}`
  );
  const data = await res.json();

  if (data.id) {
    // Display UI
    displaySuccessUI();

    // Move Ui Up
    animateUp();

    // Render Data
    setTimeout(renderData, 1000, data);

    // Move Ui Down
    setTimeout(animateDown, 1000);

    // Unfocus Keyboard
    UnfocusKeyboard();
  } else {
    displayErrorUI();
  }
};

// Event Handlers
searchBtn.addEventListener("click", ApiCall);
