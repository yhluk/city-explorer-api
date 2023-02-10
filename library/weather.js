'use strict'

const axios = require('axios');
const cache = require('../cache')

async function getWeather (request, response){
  let searchQuery = request.query.searchQuery;
  if (!searchQuery) {
    response.status(400).send('bad request');
  }
  let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${searchQuery}&days=5`

  const key = 'weather' + searchQuery
  if (cache[key] && (Date.now() - cache[key].timestamp <120000000)){
    console.log('cash hit')
    response.status(200).send(cache[key].data)
  }
  else{
    console.log('cash misssssssssss')
    
    let weatherResponse = await axios.get(weatherUrl);
    
    if (weatherResponse) {
      
      let forecastArr = weatherResponse.data.data.map(dayData => new Forecast(dayData))
      cache[key] = {};
      cache[key].timestamp = Date.now()
      cache[key].data = forecastArr
      response.status(201).send(forecastArr)
    }
    else {
      response.status(204).send('movie not found');
    }
    }
  };
  
  class Forecast {
  constructor(day) {
    this.date = day.valid_date,
      this.description = day.weather.description
  }
}

module.exports =  getWeather;