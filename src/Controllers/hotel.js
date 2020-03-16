const hotelModel = require('../models/hotel')
const miscHelper = require('../Helpers/index')
const uniqid = require('uniqid')
const { PORT, domain } = require('../Configs/index')
// const redisCache = require('../helpers/redisCache')

module.exports = {
  getAll: async (req, res) => {
    try {
      const name = req.query.name || ''
      const lowest = req.query.lowest || 0
      const highest = req.query.highest || 10000000
      const city = req.query.city || ''
      const result = await hotelModel.getAll(name, lowest, highest, city)
      for (var i=0; i< result.length; i++){
        const images = await hotelModel.getImage(result[i].id_hotel)
        result[i].images = images
      }
      miscHelper.response(res, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(res, 404, 'Not Found!')
    }
  },

  createHotels: async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.')
      }

      const img = req.files.hotel_cover
      const imageArr = img.name.split('.')
      const imageExt = (imageArr[imageArr.length - 1]).toLowerCase()
      const filename = uniqid() + '.' + imageExt

      if (imageExt != 'png' && imageExt != 'jpg' && imageExt != 'jpeg' && imageExt != 'gif') { return res.json({ message: 'Not allowed upload another file except image' }) }

      if (img.size > 5000000) { return res.json({ message: 'Not allowed upload more than 5MB' }) }

      uploadPath = __dirname + '/../Images/' + filename

      img.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).send(err)
        }
        console.log('Upload file success')
      })
      // console.log(request.file)
      const imageAccess = `http://${domain}:${PORT}/v1/images/${filename}`
      const data = {
        hotel_name: req.body.hotel_name,
        hotel_location: req.body.hotel_location,
        hotel_cover: imageAccess,
        hotel_description: req.body.hotel_description,
        hotel_price: req.body.hotel_price,
        free_room: req.body.free_room,
        city : req.body.city || ''
      }
      const result = await hotelModel.createHotels(data)
      data.id_hotel = result.insertId
      miscHelper.response(res, 200, data)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(res, 404, 'Internal server error!')
    }
  },

  detailHotel: async (req, res) => {
    try {
      const hotelId = req.params.hotelId
      const result = await hotelModel.detailHotel(hotelId)
      miscHelper.response(res, 200, result[0])
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(res, 404, 'Internal server error!')
    }
  },

  updateHotel: async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        const data = {
          hotel_name: req.body.hotel_name,
          hotel_location: req.body.hotel_location,
          hotel_description: req.body.hotel_description,
          hotel_price: req.body.hotel_price,
          free_room: req.body.free_room
          //  date_updated: new Date()
        }
        const hotelId = req.params.hotelId
        // const key = `get-detail-product-${hotelId}`
        await hotelModel.updateHotel(data, hotelId)
        const result = await hotelModel.detailHotel(hotelId)
        const newData = result[0]
        // await redisCache.set(key, result)
        return miscHelper.response(res, 200, newData)
      }

      const img = req.files.hotel_cover
      const imageArr = img.name.split('.')
      const imageExt = (imageArr[imageArr.length - 1]).toLowerCase()
      const filename = uniqid() + '.' + imageExt

      if (imageExt != 'png' && imageExt != 'jpg' && imageExt != 'jpeg' && imageExt != 'gif') { return res.json({ message: 'Not allowed upload another file except image' }) }

      if (img.size > 5000000) { return res.json({ message: 'Not allowed upload more than 5MB' }) }

      uploadPath = __dirname + '/../Images/' + filename

      img.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).send(err)
        }
        console.log('Upload file success')
      })

      const imageAccess = `http://localhost:${PORT}/v1/images/${filename}`
      const data = {
        hotel_name: req.body.hotel_name,
        hotel_location: req.body.hotel_location,
        hotel_cover: imageAccess,
        hotel_description: req.body.hotel_description,
        hotel_price: req.body.hotel_price,
        free_room: req.body.free_room
      //   date_updated: new Date()
      }
      const hotelId = req.params.hotelId
      // const key = `get-detail-product-${hotelId}`
      await hotelModel.updateHotel(data, hotelId)
      const result = await hotelModel.detailHotel(hotelId)
      const newData = result[0]
      // await redisCache.set(key, result)
      miscHelper.response(res, 200, newData)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(res, 404, 'Not Found!')
    }
  },

  deleteHotel: async (req, res) => {
    try {
      const hotelId = req.params.hotelId
      await hotelModel.deleteHotel(hotelId)
      miscHelper.response(res, 200, hotelId)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(res, 404, 'Not Found!')
    }
  }
}
