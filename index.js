const searchInput = document.getElementById("searchInput");
const weatherCols = document.getElementById("weather-cols")
let data = [];


function getWeatherForUserCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather, showError);
    } else {
        alert("Geolocation is not supported by this browser!!");
    }
}

function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getCity(lat, lon);
}

function showError(error) {
    if (error.code === error.PERMISSION_DENIED) {
        getWeather("cairo");
    } else {
        alert("Error getting location.");
    }
}


async function getCity(lat, lon) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b7572c973f424c9a989145737241212&q=${lat},${lon}&days=3`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const finalResponse = await response.json();
        data = finalResponse;
        displayWeather(data);
    } catch (error) {
        console.error('Error', error)
    }

}
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b7572c973f424c9a989145737241212&q=${city}&days=3`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const finalResponse = await response.json();
        data = finalResponse;
        displayWeather(data);
    } catch (error) {
        console.error('Error', error)
    }

}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDay() {
    const today = new Date();
    const nameOfToday = daysOfWeek[today.getDay()];
    return nameOfToday;
}

function getSecondDay() {
    const secondDay = new Date();
    const nameOfSecondDay = daysOfWeek[secondDay.getDay() + 1]
    return nameOfSecondDay;
}

function getThirdDay() {
    const thirdDay = new Date();
    const nameOfThirdDay = daysOfWeek[thirdDay.getDay() + 2]
    return nameOfThirdDay;
}
function getMonth() {
    const today = new Date();
    const nameOfToday = today.getDate();
    const monthName = months[today.getMonth()];
    return `${nameOfToday} , ${monthName}`;
}

function displayWeather(data) {
    cartona = ` <div id="today" class="card col-md-4 rounded-3">
                <div class="header rounded-top-3  d-flex justify-content-between">
                    <div id="first-day" class="day">
                        ${getDay()}
                    </div>
                    <div id="history" class="history">
                        ${getMonth()}
                    </div>
                </div>
                <div id="location" class="location px-3 mt-2">
                    ${data.location.name}
                </div>
                <div class="degree p-4">
                    <div id="num" class="text-white">
                        ${data.current.temp_c}<sup>o</sup>C
                    </div>
                    <div class="forcast-icn ps-3">
                       <img src="https:${data.current.condition.icon}" alt="status weather">
                    </div>
                </div>
                <div id="custom" class="custom px-3">
                    ${data.current.condition.text}
                </div>
                <div class="box-footer my-3">
                    <span><img src="imgs/icon-umberella.png" alt=""> ${data.current.feelslike_c}%</span>
                    <span><img src="imgs/icon-wind.png" alt=""> ${data.current.wind_kph}Km/h</span>
                    <span><img src="imgs/icon-compass.png" alt=""> ${data.current.wind_dir}</span>
                </div>
            </div>
            <div id="second-day" class="card col-md-4 rounded-3 p-0 text-center ">
                <div class="header rounded-top-3">
                    <div id="second-header">${getSecondDay()}</div>
                </div>
                <div id="icn" class="icn mt-5">
                    <img src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="status weather" class="w-25">
                </div>
                <div id="degree" class="mt-3">
                    ${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C
                </div>
                <small id="deg">
                     ${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C
                </small>
                <div id="custom" class="mt-3">
                    ${data.forecast.forecastday[1].day.condition.text}
                </div>
            </div>
            <div id="third-day" class="card col-md-4 rounded-3 p-0 text-center ">
                <div class="header rounded-top-3">
                    <div id="third-header">${getThirdDay()}</div>
                </div>
                <div id="icn" class="icn mt-5">
                    <img src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="status weather" class="w-25">
                </div>
                <div id="degree" class="mt-3">
                ${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C
                </div>
                <small id="deg">
                ${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C
                </small>
                <div id="custom" class="mt-3">
                      ${data.forecast.forecastday[2].day.condition.text}
                </div>
            </div>`;
    weatherCols.innerHTML = cartona;
}


getWeatherForUserCurrentLocation();
searchInput.addEventListener("input", function () {
    getWeather(searchInput.value);
})
