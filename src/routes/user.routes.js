const userRoutes = require("express").Router();
const { UserController } = require("../controllers");
const { auth } = require('../middlewares')

userRoutes.get("/", auth, UserController.get)

module.exports = userRoutes;