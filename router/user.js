const express = require("express");
const multiparty = require("connect-multiparty");
const UserController = require('../controllers/user');
const mwAuthenticated = require('../middlewares/authenticated'); // Middleware para chequear el token

const md_upload = multiparty({ uploadDir: "./uploads/avatar"}) // middleware para subir fotos, los va a guardar en esa carpeta avatar
const api = express.Router();

api.get('/me', [mwAuthenticated.confirmacionAutenticacion], UserController.getMe);
api.post('/create', [mwAuthenticated.confirmacionAutenticacion, md_upload], UserController.createUser);
api.patch('/update/:id', [mwAuthenticated.confirmacionAutenticacion, md_upload] , UserController.updateUser);
api.get('/', [mwAuthenticated.confirmacionAutenticacion], UserController.getUsers);
api.delete('/delete/:id', [mwAuthenticated.confirmacionAutenticacion] ,UserController.deleteUser);

module.exports = api;