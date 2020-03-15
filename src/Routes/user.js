const express = require("express");
const Route = express.Router();
const {
  register,
  login,
  getDetailUser,
  forgotPassword,
  changePassword,
  updateUser
} = require("../Controllers/user");

Route.post("/register", register)
  .post("/login", login)
  .get("/detail/:userId", getDetailUser)
  .post("/forgot", forgotPassword)
  .patch("/changepass", changePassword)
  .patch("/update/:userId", updateUser);

module.exports = Route;
