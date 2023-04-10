const express = require('express');
const multiparty = require('connect-multiparty')
const CourseController = require("../controllers/course");
const md_auth = require('../middlewares/authenticated');

const md_upload = multiparty({ uploadDir: "./uploads/course"});

const api = express.Router();

//APIs

api.post('/', [md_auth.confirmacionAutenticacion, md_upload], CourseController.createCourse);
api.get('/', CourseController.getCourses);

module.exports = api;
