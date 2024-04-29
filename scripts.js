async function getWeather() {
    const latitude = document.getElementById('latitudeInput').value;
    const longitude = document.getElementById('longitudeInput').value;
    const apiKey = 'fcaffc47f87b44d981891549242704';    
    const lang = 'en';
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&lang=${lang}`;


    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const weatherInfo = document.getElementById('weatherInfo');
        if (response.ok) {
            weatherInfo.innerHTML = `
            <div class="text-left text-white px-4 py-4">
                <h2 class="text-2xl font-bold mb-2">Weather Information</h2>
                <p><span>Location:</span> ${data.location.name}, ${data.location.region}, ${data.location.country} </p>
                <p><span>Temperature:</span> ${data.current.temp_c}°C (${data.current.temp_f}°F)</p>
                <p><span>Condition:</span> ${data.current.condition.text}</p>
                <p><span>Local Time:</span> ${data.location.localtime}</p>
                <p><span>Humidity: </span>${data.current.humidity}%</p>
                <p><span>Visibility: </span>${data.current.vis_km} km</p>
            </div>
            `;
        } else {
            weatherInfo.innerHTML = `
                <p class="text-lg text-red-500"> Error fetching weather data. Please try again </p>;
            `
        }
    } catch (error) {
        console.error('Error fetching weather data', error);
        document.getElementById('weatherInfo').innerHTML = `<p class="text-lg text-red-500"> An error occurred. Please try again later. </p>`;
    }
}


function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById('latitudeInput').value = latitude;
            document.getElementById('longitudeInput').value = longitude;
        }, error => {
            console.error ('Error getting current location:', error);
            alert('Error getting current location, Please try again')
        });
    } else{
        alert('Geolocation is not supported by your browser');
    }
}
