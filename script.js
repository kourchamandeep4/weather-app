const form = document.getElementById("weather-form");
const message = document.getElementById("message");
const resultSection = document.getElementById("weather-result");
const locationLabel = document.getElementById("location");
const conditionLabel = document.getElementById("condition");
const temperatureLabel = document.getElementById("temperature");
const humidityLabel = document.getElementById("humidity");
const windLabel = document.getElementById("wind");
const weatherIcon = document.getElementById("weather-icon");
const apiKeyInput = document.getElementById("apiKey");

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

function setMessage(text, isError = true) {
  message.textContent = text;
  message.style.color = isError ? "#7c3aed" : "#15803d";
}

function formatWindSpeed(speed) {
  return `${Math.round(speed)} km/h`;
}

function formatTemperature(temp) {
  return `${Math.round(temp)}°C`;
}

function showResult(data) {
  const { name, sys, main, weather, wind } = data;
  const condition = weather[0];
  const country = sys.country || "";

  locationLabel.textContent = `${name}${country ? `, ${country}` : ""}`;
  conditionLabel.textContent = condition.main || "Weather";
  temperatureLabel.textContent = formatTemperature(main.temp);
  humidityLabel.textContent = `${main.humidity}%`;
  windLabel.textContent = formatWindSpeed(wind.speed * 3.6);
  weatherIcon.src = `https://openweathermap.org/img/wn/${condition.icon}@4x.png`;
  weatherIcon.alt = condition.description || "Weather icon";
  resultSection.classList.remove("hidden");
}

function resetResult() {
  resultSection.classList.add("hidden");
}

async function fetchWeather(city, country, apiKey) {
  const query = `${city}${country ? `,${country}` : ""}`;
  const url = `${WEATHER_URL}?q=${encodeURIComponent(query)}&units=metric&appid=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url);
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const errorMessage = data?.message
      ? data.message.charAt(0).toUpperCase() + data.message.slice(1)
      : "Unable to fetch weather data.";
    throw new Error(errorMessage);
  }

  return response.json();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = form.city.value.trim();
  const country = form.country.value.trim();
  const apiKey = apiKeyInput.value.trim();

  if (!city || !country || !apiKey) {
    setMessage("Please enter city, country, and your API key.");
    resetResult();
    return;
  }

  setMessage("Finding weather…", false);
  resetResult();

  try {
    const data = await fetchWeather(city, country, apiKey);
    showResult(data);
    setMessage("", false);
  } catch (error) {
    setMessage(error.message || "Something went wrong. Try again.");
  }
});
