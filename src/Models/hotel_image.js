const connection = require('../Configs/mysql')

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM tb_hotel_images', (error, result) => {
        if (error) reject(new Error(error))
        // console.log('Get data from database')
        resolve(result)
      })
    })
  },

  createHI: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO tb_hotel_images SET ?', data, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },

  deleteHotelimg: (hotelimgId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM tb_hotel_images WHERE id_hi = ?', hotelimgId, (error, result) => {
        if (error) reject(new Error(error))
        connection.query('ALTER TABLE tb_hotel_images DROP tb_hotel_images.id_hi')
        connection.query('ALTER TABLE tb_hotel_images ADD id_hi INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
        resolve(result)
      })
    })
  }
}