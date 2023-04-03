const express = require('express');
const mwAuthenticated = require('../middlewares/authenticated');
const MenuController = require('../controllers/menu');

const api = express.Router();

//= ENDPOINTS

api.post('/create', [mwAuthenticated.confirmacionAutenticacion], MenuController.createMenu);
api.get('/all', [mwAuthenticated.confirmacionAutenticacion], MenuController.getMenus);

module.exports = api;
