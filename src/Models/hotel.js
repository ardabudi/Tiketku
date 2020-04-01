const connection = require('../Configs/mysql')

module.exports = {
  getAll: (searchName, lowest, highest, city, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM tb_hotel WHERE city LIKE '%${city}%' AND hotel_name LIKE '%${searchName}%' AND hotel_price BETWEEN ${lowest} AND ${highest} LIMIT ${limit}`, (error, result) => {
        if (error) reject(new Error(error))
        console.log('Get data from database')
        resolve(result)
      })
    })
  },
  getCity: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT city FROM tb_hotel GROUP BY tb_hotel.city`, (error, result) => {
        if (error) reject(new Error(error))
        console.log('Get data from database')
        resolve(result)
      })
    })
  },
  getImage:(id_hotel)=>{
    return new Promise((resolve,reject)=>{
      connection.query(`SELECT image as img from tb_hotel_images WHERE id_hotel = ${id_hotel}`, (error, result)=>{
        if(error) reject(new Error(error))
        resolve(result)
      })
    })
  },

  createHotels: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO tb_hotel SET ?', data, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },

  detailHotel: (hotelId) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM tb_hotel WHERE tb_hotel.id_hotel = ?`, hotelId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },

  updateHotel: (data, hotelId) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE tb_hotel SET ? WHERE id_hotel = ?', [data, hotelId], (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },

  deleteHotel: (hotelId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM tb_hotel WHERE id_hotel = ?', hotelId, (error, result) => {
        if (error) reject(new Error(error))
        connection.query('ALTER TABLE tb_hotel DROP tb_hotel.id_hotel')
        connection.query('ALTER TABLE tb_hotel ADD id_hotel INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
        resolve(result)
      })
    })
  }
}
