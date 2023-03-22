const express = require("express");
const userController = require('../controllers/user');
const confirmacionAutenticacion = require('../middlewares/authenticated');

const api = express.Router();

api.get('/user/me', confirmacionAutenticacion, userController.getMe);
api.get('/users', confirmacionAutenticacion, userController.getUsers);

module.exports = api;