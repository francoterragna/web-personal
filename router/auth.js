const express = require("express");
const authController = require("../controllers/auth")

const api = express.Router();

api.post("/register", authController.register);

api.post("/login", authController.login);

api.post("/refresh_access_token", authController.refreshAccessToken);

module.exports = api;