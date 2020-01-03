//Api key creata per start2impact come variabile d'ambiente
let api_key = process.env.API_KEY;
//Campi input HTML
const input_field = document.querySelector("input");
const response_img = document.querySelector("#response");
//Campi informazioni HTML
const paese_field = document.querySelector("#paese");
const icon_span = document.querySelector("#icon-span");
const img_field = document.querySelector("#icon");
const description_field = document.querySelector("#description");
const temp_field = document.querySelector("#temp");
const feels_like_field = document.querySelector("#feels_like");
const pressure_field = document.querySelector("#pressure");
const humidity_field = document.querySelector("#humidity");
const tempMin_field = document.querySelector("#temp_min");
const tempMax_field = document.querySelector("#temp_max");
const wind_field = document.querySelector("#vento");
const wind_direction = document.querySelector("#direzione");
//main 

input_field.focus();
input_field.select();
input_field.addEventListener("keyup", createUrl);
window.addEventListener("load", getCurrentPosition);

function getCurrentPosition() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            if (location.protocol === 'http:') {
                url = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + api_key + "&units=metric&lang=it";
            } else {
                url = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + api_key + "&units=metric&lang=it";
            }
            getWeather(url);
        });
    }
}

function createUrl() {
    let url;
    if (input_field.value !== "Inserisci città") {
        let paese = input_field.value;
        if (location.protocol === 'http:') {
            url = "http://api.openweathermap.org/data/2.5/weather?q=" + paese + "&appid=" + api_key + "&units=metric&lang=it";
        } else {
            url = "https://api.openweathermap.org/data/2.5/weather?q=" + paese + "&appid=" + api_key + "&units=metric&lang=it";

        }
        getWeather(url);
    }
}

function getWeather(url) {
    $.ajax({
        async: true,
        url: url,
        success: function(data) {
            callback(data);
            response_img.setAttribute("src", "icons/checkmark.svg");
        },
        error: function() {
            response_img.setAttribute("src", "icons/wrong.svg");
        },
        dataType: 'json',
        type: 'GET'
    });
}

function callback(data) {
    const id = data.sys.id;
    const icon = data.weather[0].icon;
    let description = data.weather[0].description;
    const main = data.main;
    const temp = main.temp;
    const feels_like = main.feels_like;
    const pressure = main.pressure;
    const humidity = main.humidity;
    const temp_min = main.temp_min;
    const temp_max = main.temp_max;
    paese_field.innerHTML = data.name + data.sys.country.sub() /* + ("- id: " + id).sub()*/ ;
    if (location.protocol === "http:") {
        img_field.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
    } else {
        img_field.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
    }
    img_field.style.backgroundColor = "#87ceeb";
    img_field.style.borderRadius = "20px";
    description = description.replace(description[0], description[0].toUpperCase());
    description_field.textContent = description;
    temp_field.textContent = temp + "° C";
    feels_like_field.textContent = feels_like + "° C";
    pressure_field.textContent = pressure + " hpa";
    humidity_field.textContent = humidity + "%";
    tempMin_field.textContent = temp_min + "° C";
    tempMax_field.textContent = temp_max + "° C";
    wind_field.textContent = data.wind.speed + " m/s";
    wind_direction.textContent = (data.wind.deg === undefined) ? " - " : data.wind.deg + "°";
}