const express = require('express')
const Route = express.Router()

const hotelRouter = require('./hotel')
const hotelimgRouter = require('./hotel_image')
const bookingRouter = require('./booking')
const userRouter = require('./user')
// const categoryRouter = require('./category')
// const purchaseRouter = require('./purchase')
// const lastweek = require('./lastweek')

Route
  .use('/user', userRouter)
  .use('/hotel', hotelRouter)
  .use('/hotelimg', hotelimgRouter)
  .use('/booking', bookingRouter )
  .use('/images/', express.static('./src/Images'))

module.exports = Route