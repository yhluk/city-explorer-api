'use strict'

require('dotenv').config();
const express = require('express');

const cors = require('cors');
const app = express();

app.use(cors())

const PORT = process.env.PORT || 3002;
const getWeather = require('./library/weather')
const getMovie = require('./library/movie')


app.get('/', (request, response) => {
  response.send('your backend is live, YES its live')
})

//*****************************     Weather
app.get('/weather', getWeather)


//*****************************     Movie
app.get('/movies', getMovie)



app.listen(PORT, () => console.log(`listening on ${PORT}`))