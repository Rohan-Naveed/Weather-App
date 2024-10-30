const ApiKey = "668268a109c340356e0cd1374876cfe3";
const searchBtn = document.querySelector(".search-btn");
const image = document.querySelector(".image");
const temperature = document.querySelector(".weather-temperature");
const description = document.querySelector(".weather-description");

// Functions
const renderingImg = function (data) {
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

const renderingMainData = function (data) {
  // Temperature
  temperature.innerHTML = `<p>${Number(data.main.temp).toFixed(
    0
  )}<span>°C</span></p>`;

  // Description
  description.innerHTML = ` <p>${data.weather[0].description}</p>`;
};

const ApiCall = async function () {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Pakistan&units=metric&appid=${ApiKey}`
  );
  const data = await res.json();

  if (data.id) {
    console.log(data);

    // Rendering Image
    renderingImg(data);

    // Rendering Temperature And Description
    renderingMainData(data);
  }
};

ApiCall();
