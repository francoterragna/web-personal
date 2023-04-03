const express = require('express');
const mwAuthenticated = require('../middlewares/authenticated');
const MenuController = require('../controllers/menu');

const api = express.Router();

//= ENDPOINTS

api.post('/create', [mwAuthenticated.confirmacionAutenticacion], MenuController.createMenu);

api.patch('/update/:id', [mwAuthenticated.confirmacionAutenticacion], MenuController.updateMenus);

api.get('/', MenuController.getMenus); //= ACA NO LE PASO EL MIDDLEWARE PORQUE NO HACE FALTA ESTAR LOGUEADO PARA VER LOS MENUS 

api.delete('/delete/:id', [mwAuthenticated.confirmacionAutenticacion] ,MenuController.deleteMenu);

module.exports = api;
