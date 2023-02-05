'use strict'

const axios = require('axios');

async function getWeather (request, response){
  let searchQuery = request.query.searchQuery;
  if (!searchQuery) {
    response.status(400).send('bad request');
  }

  let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${searchQuery}&days=5`

  let weatherResponse = await axios.get(weatherUrl);

  if (weatherResponse) {

    let forecastArr = weatherResponse.data.data.map(dayData => new Forecast(dayData))
    response.status(201).send(forecastArr)
  }
  else {
    response.status(204).send('movie not found');
  }
};

class Forecast {
  constructor(day) {
    this.date = day.valid_date,
      this.description = day.weather.description
  }
}

module.exports =  getWeather;