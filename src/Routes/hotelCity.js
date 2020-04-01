const express = require('express')
const Route = express.Router()

const { getCity } = require('../Controllers/hotel')

Route
  .get('/', getCity)

module.exports = Route