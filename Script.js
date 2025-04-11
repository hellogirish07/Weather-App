function getWeather() {
    const city = document.getElementById('city').value.trim();
    const apiKey = 'a57d65a2330043e0f5d89702e806da8b';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    const weatherInfo = document.querySelector('#weather-info');
    weatherInfo.innerHTML = ""; // Clear previous

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            const forecasts = data.list;
            const dailyForecasts = [];

            // Get approx 12:00 PM forecast for each day
            const uniqueDays = new Set();
            for (let i = 0; i < forecasts.length; i++) {
                const date = forecasts[i].dt_txt.split(" ")[0];
                const hour = forecasts[i].dt_txt.split(" ")[1];
                if (!uniqueDays.has(date) && hour.startsWith("12")) {
                    uniqueDays.add(date);
                    dailyForecasts.push(forecasts[i]);
                }
                if (dailyForecasts.length === 5) break;
            }

            weatherInfo.innerHTML = `<h3 class="text-xl font-semibold mb-4 text-blue-800">${city} - 5 Day Forecast</h3>`;

            dailyForecasts.forEach(forecast => {
                const date = new Date(forecast.dt_txt).toLocaleDateString();
                const temp = Math.round(forecast.main.temp - 273.15);
                const desc = forecast.weather[0].description;
                const humidity = forecast.main.humidity;
                const wind = forecast.wind.speed;

                const card = `
                    <div class="bg-white shadow-md rounded-xl p-4 mb-4 border-l-4 border-blue-500">
                        <h4 class="text-lg font-bold text-blue-700">${date}</h4>
                        <p class="text-gray-800"><strong>Temp:</strong> ${temp}&deg;C</p>
                        <p class="text-gray-800"><strong>Condition:</strong> ${desc}</p>
                        <p class="text-gray-800"><strong>Humidity:</strong> ${humidity}%</p>
                        <p class="text-gray-800"><strong>Wind:</strong> ${wind} m/s</p>
                    </div>
                `;
                weatherInfo.innerHTML += card;
            });
        })
        .catch(error => {
            weatherInfo.innerHTML = `
                <div class="bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
                    <p>⚠️ ${error.message}. Please try again.</p>
                </div>
            `;
        });
}
