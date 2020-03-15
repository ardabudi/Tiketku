const express = require('express')
const Route = express.Router()

const { getAll, createHI, deleteHotelimg } = require('../Controllers/hotel_image')

Route
  .get('/', getAll)
  .post('/', createHI)
  .delete('/:hotelimgId', deleteHotelimg)

module.exports = Route
