// idea based on:
// https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9

const express = require('express');
const axios = require('axios');

const app = express();

// root 
app.get('/', (req, res) => {
  res.json({
    readMe: [
      'This is root!',
      'Routes match url paths stemming from Codewars API, "https://www.codewars.com/api/v1/".',
      'All routes are GET.',
      'Route 0: "/" ROOT',
      'Route 1: "/users/:username" LOOKUP CODEWARS ACCOUNT',
      'Route 2: "/users/:username/code-challenges/completed" LOOKUP ACCOUNT\'S COMPLETED CODE CHALLENGES',
      'Route 3: "/code-challenges/:id" LOOKUP CODE-CHALLENGE BY ID'
    ]
  })
})

// get request from my codewars app
// becomes api request to codewars 
const url = `https://www.codewars.com/api/v1/`

// we have 3 types of api calls
// looking up user account 
// looking up what code challenges they finished
// and looking up the code challenge id 

// function for our axios call 
function axiosCall(newURL, res) {
  // change header to avoid CORS error 
  res.header('Access-Control-Allow-Origin', '*')

  axios.get(newURL, {
    Accept: "application/json"
  })
    .then((response) => {
      // console.log(response)
      res.json(response.data)
    })
    .catch((er) => {
      // console.log(er)
      res.send(er)
    })
}

// looking up user 
app.get('/users/:username', (req, res) => {
  const newURL = url + 'users/' + req.params.username

  axiosCall(newURL, res)
})

// looking up a user's code challenges
// users/:username/code-challenges/completed

app.get('/users/:username/code-challenges/completed', (req, res) => {
  const newURL = url + 'users/' + req.params.username + '/code-challenges/completed'

  axiosCall(newURL, res)
})

// looking up a code challenge by ID
// code-challenges/id
app.get('/code-challenges/:id', (req, res) => {
  const newURL = url + 'code-challenges/' + req.params.id

  axiosCall(newURL, res)
})

// app port and listen
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening to port ${PORT}`))