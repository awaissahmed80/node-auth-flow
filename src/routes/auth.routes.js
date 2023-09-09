const authRoutes = require("express").Router();
const { AuthController } = require("../controllers");
const { authValidation } = require("../validators")

authRoutes.post("/login", authValidation.loginRequest, AuthController.login)
authRoutes.post("/register", authValidation.registerRequest, AuthController.register)
authRoutes.post("/refresh_token", AuthController.refresh_token)

module.exports = authRoutes;