const apiUrl = "c05342eef6e874c477a30fe40c586efb";
const searchInputEL = document.getElementById("search-input");
const searchButtonEL = document.getElementById("search-btn");
const temperatureEL = document.querySelector(".temp");
const weatherEl = document.querySelector(".weather");
const locationEL = document.querySelector(".location");
const weatherIcon = document.querySelector(".weather-img");
const feelLikeEL = document.querySelector(".feels-like");
const weatherDetails = document.querySelector(".weather-box");
const errorEL = document.querySelector(".error");

searchButtonEL.addEventListener("click", (e) => {
  e.preventDefault();
  const location = searchInputEL.value;
  if (location) {
    getWeatherData(location);
  }
  searchInputEL.value = "";
});

function getWeatherData(location) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiUrl}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("API request failed");
      }
    })
    .then((data) => {
      console.log(data);
      weatherDetails.style.display = "flex";
      const { main, name, weather } = data;
      temperatureEL.textContent = `${Math.round(main.temp - 273.15)}°C`;
      feelLikeEL.textContent = `Feels like: ${Math.round(main.feels_like - 277.08)}°C`;
      weatherEl.textContent = weather[0].description;
      locationEL.textContent = name;
      weatherIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
    })
    .catch((error) => {
      console.log(error);
      errorEL.textContent = "Location not found! Please try again.";
      setTimeout(() => {
        errorEL.textContent = "";
      }, 3000);
    });
}
