'use strict'

//.env lbrery
require('dotenv').config();

//express acces
const express = require('express');

//initializing the express lib
const app = express();

const cors = require('cors');

app.use(cors())

const PORT = process.env.PORT || 3002;

const weatherData = require('./data/weather.json')


app.get('/lists', (request, response)=>{
  response.send(lists)
})

app.get('/sup',(request, response)=>{
  // console.log(request.query)
  let weatherData = lis
})

app.listen(PORT, ()=>console.log(`listening on ${PORT}`))