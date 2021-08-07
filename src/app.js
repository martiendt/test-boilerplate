const express = require('express')
const app = express()
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv-safe').config();

// gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app
app.use(compression())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: false }))

// set security HTTP headers
app.use(helmet())

// cors
app.use(cors())

// v1 api routes
app.use('/v1', require('./router'))

module.exports = app