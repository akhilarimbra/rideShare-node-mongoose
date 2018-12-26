const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const routes = require('./routes')

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(
  `mongodb://localhost/${
    process.env.NODE_ENV === 'test' ? 'ride_share_test' : 'ride_share'
  }`,
  { useNewUrlParser: true }
)
app.use(bodyParser.json())
routes(app)

app.use((error, request, response, next) => {
  if (error) {
    return response.status(422).send(error)
  }

  next()
})

module.exports = app
