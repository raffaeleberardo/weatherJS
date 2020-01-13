//api_key creata per start2impact come variabile d'ambiente
let api_key = process.env.API_KEY;
//primo piano
//show table button
const show_table = document.querySelector("#show-table");
const hide_table = document.querySelector("#hide-table");
//input
const input_field = document.querySelector("input");
const response_img = document.querySelector("#response");
//info primo piano
const paese_field = document.querySelector("#paese");
const id_paese = document.querySelector("#id-paese");
const description_field = document.querySelector("#description");
const img_field = document.querySelectorAll(".weather-icon");
const temp_field = document.querySelector("#temperatura");
const humidity_field = document.querySelector("#humidity");
const wind_icon = document.querySelector("#wind-icon");
const wind_field = document.querySelector("#wind-speed");
const view_field = document.querySelector("#view");
const pressure_field = document.querySelector("#pressure");
//info tabella
const table = document.querySelector("#table");
const massima_field = document.querySelector("#massima");
const minima_field = document.querySelector("#minima");
const percepita_field = document.querySelector("#percepita");

//main 
//global variables
let url = ((location.protocol === "http") ? "http:" : "https") + "://api.openweathermap.org/data/2.5/weather?appid=" + api_key + "&units=metric&lang=it&";
//functions
input_field.focus();
input_field.select();
input_field.addEventListener("keyup", paeseUrl);
window.addEventListener("load", firstLoad);
//funzioni mostra e nascondi dettagli
show_table.addEventListener("click", function() {
    table.style.width = "100%";
});

hide_table.addEventListener("click", function() {
    table.style.width = "0";
});


function paeseUrl() {
    if (input_field.value !== "Inserisci città") {
        paese = input_field.value;
        getWeather(url + "q=" + paese);
    }
}

function firstLoad() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            getWeather(url + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude);
        });
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
    //salvataggio informazioni nelle singole variabili
    const id = data.id;
    let description = data.weather[0].description;
    const icon = data.weather[0].id;
    const main = data.main;
    const temperatura = main.temp;
    const humidity = main.humidity;
    const wind_direction = data.wind.deg;
    const wind_speed = data.wind.speed;
    const view = data.visibility;
    const pressure = main.pressure;
    //dati tabella
    const massima = data.main.temp_max;
    const minima = data.main.temp_min;
    const percepita = data.main.feels_like;
    //trasferimento dati nei campi HTML
    //primo piano
    paese_field.innerHTML = data.name + data.sys.country.sub();
    id_paese.textContent = "ID: " + id;
    for (let i = 0; i < img_field.length; i++) {
        img_field[i].className = "wi wi-owm-" + ((data.sys.sunrise < data.dt && data.dt < data.sys.sunset) ? "day-" : "night-") + icon;
    }
    description = description.replace(description[0], description[0].toUpperCase());
    description_field.textContent = description;
    temp_field.textContent = temperatura + "°C";
    //dettagli
    humidity_field.textContent = humidity + "%";
    wind_icon.className = (wind_direction !== undefined) ? wind_icon.className.replace(/\d+/g, wind_direction) : wind_icon.className.replace(/\d+/g, "0");
    wind_field.textContent = (wind_speed === undefined) ? "-" : (wind_speed + "m/s");
    view_field.textContent = (isNaN(view)) ? "-" : ((view / 1000) + "km");
    pressure_field.textContent = (pressure / 100) + "mbar";
    //compilazione campi tabella
    massima_field.textContent = massima + "°C";
    minima_field.textContent = minima + "°C";
    percepita_field.textContent = percepita + "°C";
}