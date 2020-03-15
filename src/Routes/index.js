const express = require("express");
const Route = express.Router();
// const productRouter = require('./product')
const userRouter = require("./user");
// const categoryRouter = require('./category')
// const purchaseRouter = require('./purchase')
// const lastweek = require('./lastweek')

Route.use("/user", userRouter).use("/images", express.static("./src/images"));

module.exports = Route;
