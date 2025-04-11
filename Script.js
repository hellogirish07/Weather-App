function getWeather() {
    const city = document.getElementById('city').value.trim();
    const apiKey = 'a57d65a2330043e0f5d89702e806da8b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.querySelector('#weather-info');
            const temp = Math.round(data.main.temp - 273.15);
            const desc = data.weather[0].description;

            weatherInfo.innerHTML = `
                <div class="bg-blue-100 rounded-lg p-4 shadow-md transition">
                    <h3 class="text-2xl font-semibold text-blue-700 mb-2">${city}</h3>
                    <p class="text-2xl text-gray-800">
                        <strong>Temperature:</strong> <span>${temp}&deg;C</span>
                    </p>
                    <p class="text-2xl text-gray-800">
                        <strong>Condition:</strong> <span class="capitalize">${desc}</span>
                    </p>
                </div>
            `;
        })
        .catch(error => {
            const weatherInfo = document.querySelector('#weather-info');
            weatherInfo.innerHTML = `
                <div class="bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
                    <p>⚠️ ${error.message}. Please try again.</p>
                </div>
            `;
        });
}
