// weatherAPI.com key
const apiKey = "e3d3c63b3cda4a3481c232447242304";

// Function to fetch weather data
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Function to fetch forecast data
async function fetchForecast(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=8&aqi=yes&alerts=yes`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}
// Function to update the forecast HTML
function updateForecast(forecastData, useMetric) {
  const forecastDiv = document.getElementById("forecast-info");
  const temperatureCheckbox = document.getElementById("temperature");
  const windCheckbox = document.getElementById("wind");
  const pressureCheckbox = document.getElementById("pressure");
  const humidityCheckbox = document.getElementById("humidity");
  const feelslikeCheckbox = document.getElementById("feelslike");
  const visibilityCheckbox = document.getElementById("visibility");
  const uvCheckbox = document.getElementById("uv");
  const gustCheckbox = document.getElementById("gust");

  forecastDiv.innerHTML = "<h2>7-Day Forecast</h2>";

  const forecastContainer = document.createElement("div");
  forecastContainer.className = "forecast-container";

  // Allows for skipping of first day to make it accurate
  const forecastStartingTomorrow = forecastData.forecast.forecastday.slice(1);

  forecastStartingTomorrow.forEach((day) => {
    const dayContainer = document.createElement("div");
    dayContainer.className = "day-forecast";
    const date = new Date(day.date);
    const dayOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][date.getDay()];
    const formattedDate = date.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
    });

    let weatherInfo = `<h3>${dayOfWeek}, ${formattedDate}</h3>`;
    // Checkboxes to check to see what to display
    if (temperatureCheckbox.checked) {
      weatherInfo += `<p>Temperature: ${
        useMetric ? day.day.maxtemp_c : day.day.maxtemp_f
      } ${useMetric ? "°C" : "°F"}</p>`;
    }
    if (windCheckbox.checked) {
      weatherInfo += `<p>Wind Speed: ${
        useMetric ? day.day.maxwind_kph : day.day.maxwind_mph
      } ${useMetric ? "km/h" : "mph"}</p>`;
      if (day.day.condition.wind_dir) {
        weatherInfo += `<p>Wind Direction: ${day.day.condition.wind_dir}</p>`;
      }
    }
    if (pressureCheckbox.checked) {
      weatherInfo += `<p>Pressure: ${
        useMetric ? day.day.totalprecip_mm : day.day.totalprecip_in
      } ${useMetric ? "mm" : "in"}</p>`;
    }
    if (humidityCheckbox.checked) {
      weatherInfo += `<p>Humidity: ${day.day.avghumidity}%</p>`;
    }
    if (feelslikeCheckbox.checked) {
      weatherInfo += `<p>Feels Like: ${
        useMetric ? day.day.avgtemp_c : day.day.avgtemp_f
      } ${useMetric ? "°C" : "°F"}</p>`;
    }
    if (visibilityCheckbox.checked) {
      weatherInfo += `<p>Visibility: ${
        useMetric ? day.day.avgvis_km : day.day.avgvis_miles
      } ${useMetric ? "km" : "miles"}</p>`;
    }
    if (uvCheckbox.checked) {
      weatherInfo += `<p>UV Index: ${day.day.uv}</p>`;
    }
    if (gustCheckbox.checked) {
      weatherInfo += `<p>Gust Speed: ${
        useMetric ? day.day.maxwind_kph : day.day.maxwind_mph
      } ${useMetric ? "km/h" : "mph"}</p>`;
    }
    if (day.day.condition.icon) {
      weatherInfo += `<img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" style="vertical-align: middle;">`;
    }

    dayContainer.innerHTML = weatherInfo;
    forecastContainer.appendChild(dayContainer);
  });

  forecastDiv.appendChild(forecastContainer);
}
// Updates weather for HTML
function updateWeather(weatherData, useMetric) {
  const weatherDiv = document.getElementById("weather-info");
  const temperatureCheckbox = document.getElementById("temperature");
  const windCheckbox = document.getElementById("wind");
  const pressureCheckbox = document.getElementById("pressure");
  const humidityCheckbox = document.getElementById("humidity");
  const cloudCheckbox = document.getElementById("cloud");
  const feelslikeCheckbox = document.getElementById("feelslike");
  const visibilityCheckbox = document.getElementById("visibility");
  const uvCheckbox = document.getElementById("uv");
  const gustCheckbox = document.getElementById("gust");

  let weatherInfo = `<h2>${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}</h2>`;
  // Checkboxes to see what to display
  if (temperatureCheckbox.checked) {
    weatherInfo += `<p>Temperature: ${
      useMetric ? weatherData.current.temp_c : weatherData.current.temp_f
    } ${useMetric ? "°C" : "°F"}</p>`;
  }
  if (windCheckbox.checked) {
    weatherInfo += `<p>Wind Speed: ${
      useMetric ? weatherData.current.wind_kph : weatherData.current.wind_mph
    } ${useMetric ? "km/h" : "mph"}</p>`;
    weatherInfo += `<p>Wind Direction: ${weatherData.current.wind_dir}</p>`;
  }
  if (pressureCheckbox.checked) {
    weatherInfo += `<p>Pressure: ${
      useMetric
        ? weatherData.current.pressure_mb
        : weatherData.current.pressure_in
    } ${useMetric ? "mb" : "inHg"}</p>`;
  }
  if (humidityCheckbox.checked) {
    weatherInfo += `<p>Humidity: ${weatherData.current.humidity}%</p>`;
  }
  if (cloudCheckbox.checked) {
    weatherInfo += `<p>Cloud Cover: ${weatherData.current.cloud}%</p>`;
  }
  if (feelslikeCheckbox.checked) {
    weatherInfo += `<p>Feels Like: ${
      useMetric
        ? weatherData.current.feelslike_c
        : weatherData.current.feelslike_f
    } ${useMetric ? "°C" : "°F"}</p>`;
  }
  if (visibilityCheckbox.checked) {
    weatherInfo += `<p>Visibility: ${
      useMetric ? weatherData.current.vis_km : weatherData.current.vis_miles
    } ${useMetric ? "km" : "miles"}</p>`;
  }
  if (uvCheckbox.checked) {
    weatherInfo += `<p>UV Index: ${weatherData.current.uv}</p>`;
  }
  if (gustCheckbox.checked) {
    weatherInfo += `<p>Gust Speed: ${
      useMetric ? weatherData.current.gust_kph : weatherData.current.gust_mph
    } ${useMetric ? "km/h" : "mph"}</p>`;
  }
  weatherInfo += `<img src="${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}">`;
  weatherDiv.innerHTML = weatherInfo;
}

// Function to handle search box
async function handleSubmit(event) {
  event.preventDefault();
  const city = document.getElementById("city").value;
  const weatherData = await fetchWeather(city);
  const forecastData = await fetchForecast(city);
  const useMetric = document.getElementById("metric").checked;
  updateWeather(weatherData, useMetric);
  updateForecast(forecastData, useMetric);
}

// Function to apply filters
function applySettings() {
  const city = document.getElementById("city").value;
  const weatherData = getWeatherDataFromStorage();
  const forecastData = getForecastDataFromStorage();
  if (weatherData) {
    const useMetric = document.getElementById("metric").checked;
    updateWeather(weatherData, useMetric);
  }
  if (forecastData) {
    const useMetric = document.getElementById("metric").checked;
    updateForecast(forecastData, useMetric);
  }
}

document
  .getElementById("weather-form")
  .addEventListener("submit", handleSubmit);
document
  .getElementById("settings-form")
  .addEventListener("change", applySettings);
