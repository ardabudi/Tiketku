const express = require('express')
const Route = express.Router()

const { creadBooking } = require('../Controllers/booking')

Route
  .post('/', creadBooking)

module.exports = Route
