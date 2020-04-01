const connection = require('../Configs/mysql')

module.exports = {
  getUsers: (hp) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM tb_user WHERE phone_number LIKE '%${hp}%'`, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  register: data => {
    return new Promise((resolve, reject) => {
      connection.query('ALTER TABLE tb_user AUTO_INCREMENT=0')
      connection.query('INSERT INTO tb_user SET ?', data, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  updateUser: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE tb_user SET ? WHERE id_user = ?',
        [data, id],
        (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        }
      )
    })
  },
  checkHp: hp => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM tb_user WHERE phone_number = ?',
        hp,
        (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        }
      )
    })
  },
  deleteUser: userId => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM user WHERE id = ?',
        userId,
        (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        }
      )
    })
  },
  getDetailUser: userId => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM tb_user WHERE id_user = ?',
        userId,
        (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        }
      )
    })
  },
  changePassword: (data, hp) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE tb_user SET ? WHERE phone_number= ?',
        [data, hp],
        (error, result) => {
          if (error) reject(new Error(error))
          resolve(result)
        }
      )
    })
  }
}
