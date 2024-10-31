const ApiKey = "668268a109c340356e0cd1374876cfe3";
const input = document.querySelector(".input");
const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const errorBox = document.querySelector(".error-box");
const searchBtn = document.querySelector(".search-btn");
const image = document.querySelector(".image");
const temperature = document.querySelector(".weather-temperature");
const description = document.querySelector(".weather-description");
const humidity = document.querySelector(".humidity-data");
const wind = document.querySelector(".wind-data");

// Functions
const renderImg = function (data) {
  switch (data.weather[0].main) {
    case "Clear":
      image.src = "images/clear.png";
      break;

    case "Rain":
      image.src = "images/rain.png";
      break;

    case "Snow":
      image.src = "images/snow.png";
      break;

    case "Clouds":
      image.src = "images/cloud.png";
      break;

    case "Mist":
      image.src = "images/mist.png";
      break;

    case "Haze":
      image.src = "images/mist.png";
      break;

    default:
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
  humidity.innerHTML = ` <p>${data.main.humidity}%</p><p>Humidity</p>`;
  wind.innerHTML = `<p>${Number(data.wind.speed).toFixed(0)} km/h</p>
  <p>Wind Speed</p>`;
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

const ApiCall = async function (e) {
  const country = input.value;
  console.log(country);
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${ApiKey}`
  );
  const data = await res.json();

  if (data.id) {
    console.log(data);

    // Rendering Image
    renderImg(data);

    // Rendering Temperature And Description
    renderMainData(data);

    // Rendering Humidity And Wind
    renderMinorData(data);

    // Display UI
    displaySuccessUI();
  } else {
    displayErrorUI();
  }
};

// Event Handlers
searchBtn.addEventListener("click", ApiCall);
