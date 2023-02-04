'use strict'

require('dotenv').config();
const express = require('express');
// const weatherData = require('./data/weather.json');
const cors = require('cors');
const app = express();
const axios = require ('axios');
app.use(cors())

const PORT = process.env.PORT || 3002;


app.get('/', (request, response) => {
  response.send('your backend is live, YES its live')
})

class Forecast {
  constructor(day) {
    this.date = day.valid_date,
    this.description = day.weather.description
  }
}

class Movie {
  constructor(movie){
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.average_votes =  movie.vote_average;
    this.total_votes =  movie.vote_count;
    this.image_url =  movie.poster_path;
    this.popularity =  movie.popularity;
    this.released_on =  movie.release_date;
  }
}


app.get('/weather', async (request, response) => {
  let searchQuery = request.query.searchQuery;
  if (!searchQuery) {
    response.status(400).send('bad request');
  }

let weatherUrl =`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${searchQuery}&days=5`

let weatherResponse = await axios.get(weatherUrl);

    // response.send(weatherResponse.data.data[0].valid_date)
    // let foundCity = weatherData.find(day => day.city_name.toLowerCase() === searchQuery.toLowerCase())
    // console.log(foundCity);


  if (weatherResponse) {

    let forecastArr = weatherResponse.data.data.map(dayData => new Forecast(dayData))
    response.status(201).send(forecastArr)
  }
  else {
    response.status(204).send('movie not found');
  }
});

app.get('/movies', async (request, response) =>{
  let searchQuery = request.query.searchQuery;
  if(!searchQuery){
    response.status(400).send('bad request');
  }
  
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`
  let movieResponse = await axios.get(movieUrl);
  // console.log(movieResponse.data.results)

  
  if (movieResponse){
let movieArr = movieResponse.data.results.map(movie => new Movie(movie))
    response.status(201).send(movieArr.slice(0, 5))
  // //   console.log(movieArr)
  }
   else{
     response.status(204).send('movie not found');
   }

})





app.listen(PORT, () => console.log(`listening on ${PORT}`))