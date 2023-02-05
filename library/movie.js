'use strict'

const axios = require('axios');

async function getMovie (request, response)  {
  let searchQuery = request.query.searchQuery;
  if (!searchQuery) {
    response.status(400).send('bad request');
  }
  
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`
  let movieResponse = await axios.get(movieUrl);
  // console.log(movieResponse)
  if (movieResponse) {
    let movieArr = movieResponse.data.results.map(movie => new Movie(movie))
    // console.log(movieResponse.data.results)
    response.status(201).send(movieArr.slice(0, 5))
  }
  else {
    response.status(204).send('movie not found');
  }
  
}
class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = movie.poster_path;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}


module.exports =  getMovie;