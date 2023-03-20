const User = require('../models/user');
const bcrypt = require('bcryptjs');

let register = (req,res) => {
const {firstname, lastname, email, password} = req.body;

if(!email) res.status(400).send({msg: "El email es obligatorio"})
if(!password) res.status(400).send({msg: "La contraseña es obligatoria"});

const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: false
})

const salt = bcrypt.genSaltSync(10);
const hashPassword = bcrypt.hashSync(password, salt);
user.password = hashPassword;



user.save((error, userStorage) => {
    error ? res.status(400).send({msg: "Error al crear el usuario"}) : res.status(200).send(userStorage);
})

// console.log(password); // contraseña sin encriptar
// console.log(hashPassword); // contraseña encriptada

console.log(user);

// res.status(200).send({msg: user})
}

module.exports = {
    register
};