//Api key creata per start2impact come variabile d'ambiente
let api_key = process.env.API_KEY;
//Campi input HTML
const input_field = document.querySelector("input");
const response_img = document.querySelector("#response");
const save_button = document.querySelector("#save");
//Campi informazioni HTML
const paese_field = document.querySelector("#paese");
const img_field = document.querySelector("#weather");
const description_field = document.querySelector("#description");
const temp_field = document.querySelector("#temp");
const feels_like_field = document.querySelector("#feels_like");
const pressure_field = document.querySelector("#pressure");
const humidity_field = document.querySelector("#humidity");
const tempMin_field = document.querySelector("#temp_min");
const tempMax_field = document.querySelector("#temp_max");
const wind_field = document.querySelector("#vento");
const wind_direction = document.querySelector("#direzione");
const more_details = document.querySelector("#plus-icon");
const minus_details = document.querySelector("#negative-icon");
const show_details = document.querySelector("#dettagli");
let salvaPaese;
//main 

input_field.focus();
input_field.select();
input_field.addEventListener("keyup", createUrl);
window.addEventListener("load", getCurrentPosition);
more_details.addEventListener("click", showDetails);
minus_details.addEventListener("click", function() {
    setTimeout(hideDetails, 500)
});
save_button.addEventListener("click", saveCity);

function getCurrentPosition() {
    if (localStorage.city !== undefined) {
        let paese = localStorage.city;
        if (location.protocol === 'http:') {
            url = "http://api.openweathermap.org/data/2.5/weather?q=" + paese + "&appid=" + api_key + "&units=metric&lang=it";
        } else {
            url = "https://api.openweathermap.org/data/2.5/weather?q=" + paese + "&appid=" + api_key + "&units=metric&lang=it";

        }
        getWeather(url);
    } else if ("geolocation" in navigator) {
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
            save_button.style.display = "block";

        },
        error: function() {
            response_img.setAttribute("src", "icons/wrong.svg");
            save_button.style.display = "none";
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
    salvaPaese = data.name;
    paese_field.innerHTML = data.name + (data.sys.country + " - ID: " + id).sub();
    if (location.protocol === "http:") {
        img_field.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
    } else {
        img_field.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
    }
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
    wind_direction.textContent = (data.wind.deg === undefined) ? " - " : toTextualDescription(data.wind.deg);
}

function toTextualDescription(degree) {
    if (degree > 337.5) return 'Nord';
    if (degree > 292.5) return 'Nord Ovest';
    if (degree > 247.5) return 'Ovest';
    if (degree > 202.5) return 'Sud Ovest';
    if (degree > 157.5) return 'Sud';
    if (degree > 122.5) return 'Sud Est';
    if (degree > 67.5) return 'Est';
    if (degree > 22.5) { return 'Nord Est'; }
    return 'Northerly';
}

function showDetails() {
    show_details.style.display = "block";
}

function hideDetails() {
    show_details.style.display = "none";
}

function saveCity() {
    localStorage.city = salvaPaese;
    alert("Salvataggio di " + salvaPaese + "effettuato correttamente!");
}