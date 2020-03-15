const models = require('../Models/hotel_image')
const uniqid = require('uniqid')
const helpers = require('../Helpers/index')
const { PORT } = require('../Configs/index')

module.exports = {
  getAll: async (req, res) => {
    try {
      const result = await models.getAll()
      helpers.response(res, 200, result)
    } catch (error) {
      helpers.customErrorResponse(res, 500, 'Failed')
    }
  },

  createHI: async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.')
      }

      const img = req.files.image
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
      const imageAccess = `http://localhost:${PORT}/v1/images/${filename}`
      const data = {
        id_hotel: req.body.id_hotel,
        image: imageAccess
      }
      const result = await models.createHI(data)
      data.id_hotel = result.insertId
      helpers.response(res, 200, data)
    } catch (error) {
      console.log(error)
      helpers.customErrorResponse(res, 404, 'Internal server error!')
    }
  },

  deleteHotelimg: async (req, res) => {
    try {
      const hotelimgId = req.params.hotelimgId
      await models.deleteHotelimg(hotelimgId)
      helpers.response(res, 200, hotelimgId)
    } catch (error) {
      console.log(error)
      helpers.customErrorResponse(res, 404, 'Not Found!')
    }
  }
}