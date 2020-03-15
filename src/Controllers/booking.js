const bookingModel = require('../Models/booking')
const helper = require('../Helpers/index')

module.exports = {
  creadBooking: async (req, res) => {
    try {
      const data = {
        id_user: req.body.id_user,
        id_hotel: req.body.id_hotel,
        total_price: req.body.total_price,
        check_in: req.body.check_in,
        check_out: req.body.check_out,
        number_visitors: req.body.number_visitors,
        unit_room: req.body.unit_room
      }
      await bookingModel.creadBooking(data)
      helper.response(res, 200, 'added successfully')
    } catch (error) {
      console.log(error)
      helper.customErrorResponse(res, 500, 'Failed')
    }
  }
}
