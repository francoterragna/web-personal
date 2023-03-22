const User = require('../models/user');

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

    // console.log(response);
    res.status(200).send(response);
}

module.exports = {
    getMe,
    getUsers
}