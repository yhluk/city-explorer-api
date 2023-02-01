'use strict'

require('dotenv').config();
const express = require('express');
const weatherData = require('./data/weather.json')
const cors = require('cors');

const app = express();
app.use(cors())

const PORT = process.env.PORT || 3002;


app.get('/', (request, response) => {
  response.send('its live')
})

class Forecast {
  constructor(day) {
    this.date = day.valid_date
    this.description = day.weather.description
  }
}


app.get('/weather', (request, response) => {
  let searchQuery = request.query.searchQuery;
  // console.log(searchQuery);

  if (!searchQuery) {
    response.status(400).send('bad request');
  }

  let foundCity = weatherData.find(obj => obj.city_name.toLowerCase() === searchQuery.toLowerCase())
  console.log(foundCity);


  if (foundCity) {
    let forecastArr = foundCity.data.map(obj => new Forecast(obj))
    response.status(201).send(forecastArr)
  }
  else {
    res.status(204).send('city not found');
  }
});


app.listen(PORT, () => console.log(`listening on ${PORT}`))