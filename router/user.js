const express = require("express");
const multiparty = require("connect-multiparty");
const UserController = require('../controllers/user');
const confirmacionAutenticacion = require('../middlewares/authenticated');

const md_upload = multiparty({ uploadDir: "./uploads/avatar"}) // middleware para subir fotos, los va a guardar en esa carpeta avatar
const api = express.Router();

api.get('/user/me', confirmacionAutenticacion, UserController.getMe);
api.get('/users', confirmacionAutenticacion, UserController.getUsers);
api.post('/createUser', [confirmacionAutenticacion, md_upload], UserController.createUser);

module.exports = api;