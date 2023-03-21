//Aca se configura la comunicación del servidor con la base de datos.
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    active: Boolean,
    avatar: String
});

module.exports = mongoose.model("User", UserSchema);
