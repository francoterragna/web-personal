const express = require ('express');
const NewsletterController = require('../controllers/newsletter');
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

api.post('/', NewsletterController.suscribeEmail);

api.get('/', [md_auth.confirmacionAutenticacion], NewsletterController.getEmails);

api.delete('/:id', [md_auth.confirmacionAutenticacion], NewsletterController.deleteEmail);

module.exports = api;