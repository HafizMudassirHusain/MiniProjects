const apiKey = 'ea0a55ef40e46f250d973be66e7d95e2'; // Replace with your actual API key

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const city = document.getElementById('city-input').value;
        if (city) {
            fetchWeatherDataByCity(city);
        }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
            initMap(latitude, longitude);
        }, showError);
    } else {
        weather.innerHTML = "Geolocation is not supported by this browser.";
    }
});

function fetchWeatherDataByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
            fetchWeatherForecast(data.coord.lat, data.coord.lon);
            initMap(data.coord.lat, data.coord.lon);
        })
        .catch(error => showError(error));
}
// ==========================



function displayWeatherData(data) {
    const location = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const icon = document.getElementById('icon');

    location.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${data.main.temp}°C`;
    description.textContent = `${data.weather[0].description}`;
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    icon.alt = data.weather[0].description;
}

function fetchWeatherForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayWeatherForecast(data);
        })
        .catch(error => showError(error));
}

function displayWeatherForecast(data) {
    const forecast = document.getElementById('forecast');
    forecast.innerHTML = '<h2>5-Day Forecast</h2>';

    data.list.forEach((entry, index) => {
        if (index % 8 === 0) {
            const forecastItem = document.createElement('div');
            const date = new Date(entry.dt_txt).toLocaleDateString();
            forecastItem.innerHTML = `
                <div>
                    <img src="http://openweathermap.org/img/wn/${entry.weather[0].icon}.png" alt="${entry.weather[0].description}">
                    <p>${date}</p>
                    <p>${entry.main.temp}°C</p>
                    <p>${entry.weather[0].description}</p>
                </div>`;
            forecast.appendChild(forecastItem);
        }
    });
    
    // Display hourly forecast for the first day
    const hourlyForecast = document.createElement('div');
    hourlyForecast.innerHTML = '<h2>Hourly Forecast</h2>';
    data.list.slice(0, 8).forEach(entry => {
        const forecastHourItem = document.createElement('div');
        const time = new Date(entry.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        forecastHourItem.innerHTML = `
            <div>
                <p>${time}</p>
                <img src="http://openweathermap.org/img/wn/${entry.weather[0].icon}.png" alt="${entry.weather[0].description}">
                <p>${entry.main.temp}°C</p>
                <p>${entry.weather[0].description}</p>
            </div>`;
        hourlyForecast.appendChild(forecastHourItem);
    });
    forecast.appendChild(hourlyForecast);
}
// ========================
function displayWeatherData(data) {
    const location = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const icon = document.getElementById('icon');
    const alerts = document.getElementById('alerts');

    location.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${data.main.temp}°C`;
    description.textContent = `${data.weather[0].description}`;
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    icon.alt = data.weather[0].description;

    // Fetch weather alerts
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=metric&exclude=current,minutely,daily`)
        .then(response => response.json())
        .then(alertData => {
            if (alertData.alerts) {
                alerts.innerHTML = '<h2>Weather Alerts</h2>';
                alertData.alerts.forEach(alert => {
                    const alertItem = document.createElement('div');
                    alertItem.innerHTML = `
                        <div>
                            <p>${alert.event}</p>
                            <p>${alert.description}</p>
                        </div>`;
                    alerts.appendChild(alertItem);
                });
            }
        })
        .catch(error => showError(error));
}
// ===========================
let isCelsius = true;
const unitToggle = document.getElementById('unit-toggle');
unitToggle.addEventListener('click', () => {
    isCelsius = !isCelsius;
    unitToggle.textContent = `Switch to ${isCelsius ? '°F' : '°C'}`;
    updateWeatherUnits();
});

function updateWeatherUnits() {
    const unit = isCelsius ? 'metric' : 'imperial';
    const unitSymbol = isCelsius ? '°C' : '°F';
    const city = document.getElementById('location').textContent.split(',')[0];
    if (city) {
        fetchWeatherDataByCity(city);
    } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
            initMap(latitude, longitude);
        });
    }
}

function fetchWeatherData(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${isCelsius ? 'metric' : 'imperial'}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
            fetchWeatherForecast(lat, lon);
        })
        .catch(error => showError(error));
}

function fetchWeatherDataByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${isCelsius ? 'metric' : 'imperial'}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
            fetchWeatherForecast(data.coord.lat, data.coord.lon);
            initMap(data.coord.lat, data.coord.lon);
        })
        .catch(error => showError(error));
}
// ====================
function showError(error) {
    const weather = document.getElementById('weather');
    const alerts = document.getElementById('alerts');
    weather.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    alerts.innerHTML = '';
    console.error(error);
}
// ==========================

function initMap(lat, lon) {
    const mapDiv = document.getElementById('map');
    const map = new google.maps.Map(mapDiv, {
        center: { lat, lng: lon },
        zoom: 8
    });
    new google.maps.Marker({ position: { lat, lng: lon }, map });
}

function showError(error) {
    const weather = document.getElementById('weather');
    weather.innerHTML = `<p class="error">Error: ${error.message}</p>`;
}
