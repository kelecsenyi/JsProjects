// key: a4820b2b7fd65cfcc5e5a0e36e277191

const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');


const weather = {};

weather.temperature = {
    unit:"celcius"
}

const KELVIN = 273;
const key = "a4820b2b7fd65cfcc5e5a0e36e277191";

if ('geolocation'in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
    notificationElement.getElementsByClassName.display = "block";
    notificationElement.innerHTML = "<p>The browser does not support geolocation<p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude);
}

function showError(){
    notificationElement.getElementsByClassName.display = "block";
    notificationElement.innerHTML = "<p>The browser does not support geolocation<p>";
}

function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
    .then((response) => {
        let data = response.json();
        return data;
    })
    .then((data) => {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country  = data.sys.country;
    })
    .then(() => {
        displayWeather();
    });
}

function displayWeather(){
    iconElement.innerHTML = `<img src="assets/${weather.iconId}.png">`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}