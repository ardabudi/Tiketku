const express = require('express')
const Route = express.Router()

const { getAll, detailHotel, createHotels, deleteHotel, updateHotel } = require('../Controllers/hotel')

Route
  .get('/', getAll)
  .get('/:hotelId', detailHotel)
  .post('/', createHotels)
  .patch('/:hotelId', updateHotel)
  .delete('/:hotelId', deleteHotel)

module.exports = Route
