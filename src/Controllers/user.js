const JWT = require("jsonwebtoken");
const userModel = require("../Models/user");
const helper = require("../Helpers");
const { JWT_KEY } = require("../Configs");
const Nexmo = require("nexmo");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const hp = req.query.hp || ''
      const result = await userModel.getUsers(hp);
      helper.response(res, 200, result);
    } catch (error) {
      helper.customErrorResponse(res, 500, "Failed");
    }
  },
  register: async (req, res) => {
    try {
      const salt = helper.generateSalt(18);
      const hashPassword = helper.setPassword(req.body.password, salt);
      const data = {
        name_user: req.body.name_user,
        email: req.body.email,
        address: req.body.address,
        gender: req.body.gender,
        phone_number: req.body.phone_number,
        salt: hashPassword.salt,
        password: hashPassword.passwordHash,
        created_at: new Date(),
        updated_at: new Date()
      };
      await userModel.register(data);
      helper.response(res, 200, "user has been added");
    } catch (error) {
      console.log(error);
      helpers.customErrorResponse(res, 500, "Failed");
    }
  },
  login: async (request, response) => {
    const data = {
      password: request.body.password,
      hp: request.body.hp
    };

    const hpValid = await userModel.checkHp(data.hp);
    if (hpValid.length < 1) return response.json({ message: "Wrong Email" });
    const dataUser = hpValid[0];
    const hashPassword = helper.setPassword(data.password, dataUser.salt);

    if (hashPassword.passwordHash === dataUser.password) {
      const token = JWT.sign(
        {
          email: dataUser.email,
          id: dataUser.id
        },
        JWT_KEY,
        { expiresIn: "1m" }
      );

      delete dataUser.salt;
      delete dataUser.password;

      dataUser.token = token;
      helper.response(response, 200, dataUser);
    } else {
      response.json({ message: "Login error!" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const result = await userModel.deleteUser(userId);
      helper.response(res, 200, userId);
    } catch (error) {
      console.log(error);
      helper.customErrorResponse(res, 500, "Server error!");
    }
  },
  updateUser: async (req, res) => {
    try {
      const data = {
        name_user: req.body.name_user,
        email: req.body.email,
        address: req.body.address,
        gender: req.body.gender,
        phone_number: req.body.phone_number,
        updated_at: new Date()
      };
      const id = req.params.userId;
      console.log(id);
      await userModel.updateUser(data, id);
      helper.response(res, 200, "user has been updated");
    } catch (error) {
      console.log(error);
      helper.customErrorResponse(res, 500, "Server error!");
    }
  },
  getDetailUser: async (req, res) => {
    try {
      const result = await userModel.getDetailUser(req.params.userId);
      helper.response(res, 200, result[0]);
    } catch (error) {
      console.log(error);
      helper.customErrorResponse(res, 500, "Server error!");
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const hp = req.body.hp;
      const hpValid = await userModel.checkHp(hp);
      if (!hpValid[0]) return res.json({ message: "Phone number not Found" });
      data = {
        OTP: Math.ceil(Math.random() * 10000)
      };

      await userModel.updateUser(data, hpValid[0].id_user);

      const nexmo = new Nexmo({
        apiKey: "dd360230",
        apiSecret: "iVUUARQsgf9lxOB4"
      });

      const hpParsedArr = hp.split("");
      hpParsedArr[0] = "62";
      var realNumber = hpParsedArr.join("");

      const from = "Tiketku";
      const to = realNumber;
      const text = `From: Tiketku \n Use OTP: ${data.OTP} \n Don't tell this code to anyone`;

      await nexmo.message.sendSms(from, to, text);

      helper.response(res, 200, hp);
    } catch (error) {
      console.log(error);
      helper.customErrorResponse(res, 500, "Server error!");
    }
  },
  changePassword: async (req, res) => {
    try {
      const salt = helper.generateSalt(18);
      const newPassword = helper.setPassword(req.body.new_password, salt);
      const data = {
        password: newPassword.passwordHash,
        salt: newPassword.salt
      };
      const hp = req.body.hp;
      await userModel.changePassword(data, hp);
      helper.response(res, 200, "Change password success");
    } catch (error) {
      console.log(error);
      helper.customErrorResponse(res, 500, "Server error!");
    }
  }
};
