const express = require('express');
const router = express.Router();
const request = require('request');
const apiKey = require('../private/key');

router.get('/', function (req, res) {
    res.render('index', { weather: null, error: null });
});

router.post('/', function (req, res) {

    let city = req.body.city;
    // console.log(city);
    // console.log("hello",apiKey.module);
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey.module}`


    // http://api.openweathermap.org/data/2.5/weather?q=Paris&units=imperial&appid=fbdb33e3a17cd9fb75e12c507133184d
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        }

        else {

            let weather = JSON.parse(body);
            if (!weather.main) {

                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let tempCelsius = Math.round((weather.main.temp - 32) * 5 / 9);
                let weatherText = `It's ${tempCelsius} degrees Celsius in ${weather.name}!`;
                let weatherTextExpanded = `It's ${tempCelsius} degrees Celsius, with ${weather.main.humidity}% humidity in ${weather.name}!`;
                res.render('index', { weather: weatherTextExpanded, error: null });
            }
        }
    });
});
function getSymbolForWeather(weatherCondition) {
    switch (weatherCondition) {
        case 'Clouds':
            return '☁️';
        case 'Rain':
            return '🌧️';
        case 'Snow':
            return '❄️';
        case 'Clear':
            return '☀️';
        default:
            return '❓';
    }
}

module.exports = router;