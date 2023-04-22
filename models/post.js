const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = mongoose.Schema({
    title: String,
    miniature: String,
    content: String,
    path: {
        type: String,
        unique: true
    },
    created_at: Date
})

PostSchema.plugin(mongoosePaginate); // Con esta configuracion se puede hacer una paginacion

module.exports = mongoose.model("Post", PostSchema);