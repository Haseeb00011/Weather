const apikey = "21621a8ee3938b61792a9204293e9ce9";
const url = (location) => `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}`;

async function checkweather(location) {
    try {
        const response = await fetch(url(location) + `&appid=${apikey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        // Update your HTML elements here using the data
        document.getElementById("deg").textContent = `${data.main.temp.toFixed(1)}°C`; // Changed toFixed(1)
        document.getElementById("city").textContent = data.name;
        document.getElementById("humiN").textContent = `${data.main.humidity}%`;
        document.getElementById("windN").textContent = `${data.wind.speed}km/h`;

        //update the image based on weather.
        const weatherCondition = data.weather[0].main.toLowerCase();
        let imageSrc = "./clear.png"; //default image
        if (weatherCondition.includes('clouds')) {
            imageSrc = "./clouds.png";
        } else if (weatherCondition.includes('rain')) {
            imageSrc = "./rain.png";
        } else if (weatherCondition.includes('drizzle')) {
            imageSrc = "./drizzle.png";
        } else if (weatherCondition.includes('mist') || weatherCondition.includes('fog')) {
            imageSrc = "./mist.png";
        } else if (weatherCondition.includes('snow')) {
            imageSrc = "./snow.png";
        }
        document.getElementById('dimg').src = imageSrc;

    } catch (error) {
        console.error("There was a problem fetching the weather:", error);
        // Handle the error (e.g., display an error message to the user)
    }
}

// Initial weather check for Islamabad (or any default city)
checkweather("attock");

// Add event listener to the search button
document.getElementById("btn").addEventListener("click", () => {
    const location = document.getElementById("search-box").value;
    if (location) {
        checkweather(location);
    } else {
        alert("Please enter a city name.");
    }
});

//add event listener for enter key.
document.getElementById('search-box').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        document.getElementById('btn').click();
    }
});