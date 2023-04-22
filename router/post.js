const express = require("express");
const multiparty = require("connect-multiparty");
const PostController = require("../controllers/post");
const md_auth = require('../middlewares/authenticated');

const md_upload = multiparty({ uploadDir: "./uploads/posteos"});

const api = express.Router();

api.get('/', PostController.getPosts);

api.get('/:path', PostController.getOnePost);

api.post('/', [md_auth.confirmacionAutenticacion, md_upload], PostController.createPost);

api.patch('/:id', [md_auth.confirmacionAutenticacion, md_upload], PostController.updatePost);

api.delete('/:id', [md_auth.confirmacionAutenticacion], PostController.deletePost);

module.exports = api;