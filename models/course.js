const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CourseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
    price: Number,
    score: Number
});

CourseSchema.plugin(mongoosePaginate); // Con esta configuracion se puede hacer una paginacion

module.exports = mongoose.model("Course", CourseSchema);