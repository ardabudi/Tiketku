const connection = require('../Configs/mysql')

module.exports = {
  creadBooking: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO tb_booking SET ?', data, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
}
