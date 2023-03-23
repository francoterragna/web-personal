const User = require('../models/user');
const bcrypt = require("bcryptjs");

const getMe = async (req, res) => {
    
    const { user_id } = req.user; // Saco unicamente el user_id
    // console.log("Este es el req.user: " + req.user);
    
    const response = await User.findById(user_id); // En response guardo el usuario que encontró en mongo con ese id

    if(!response){
        res.status(400).send({ msg: "No se ha encontrado usuario" })
    } else {
        res.status(200).send(response)
    }

    // res.status(200).send({msg: "OK"})
}

const getUsers = async (req, res)  => {
    const {active} = req.query; // El req.query viene de la URL despues del "?"
    console.log("active ->", active);
    let response = null;

    if(active == undefined){
        response = await User.find();
    } else {
        response = await User.find({active});
    }
    res.status(200).send(response);
}

const createUser = async (req, res) => {

    const {password, email} = req.body;
    
    try{
        const user = new User({...req.body, active: false});
        // encriptamos contraseña
        const salt = bcrypt.genSaltSync(10);
        if(password.length > 3){
            const hashPassword = bcrypt.hashSync(password, salt);
            user.password = hashPassword;
        } else {
            res.status(400).send({msg: "La contraseña debe tener mas de 3 caracteres"})
            return;
        }
    
        if(!email){
            res.status(400).send({msg: "El email es obligatorio"})
            return;
        } else {
            const userStorage = await user.save();
            console.log(userStorage);
            res.status(200).send(userStorage);
            return;
        }
    
        // if(req.files.avatar) console.log("Procesar imagen");

    } catch(error) {
        console.log("Estoy en el catch");
        res.status(400).send({msg: "Error al crear el usuario"});
        return;
    }

}

module.exports = {
    getMe,
    getUsers,
    createUser
}