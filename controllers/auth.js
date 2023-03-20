const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

let register = async (req,res) => {
const {firstname, lastname, email, password} = req.body;

try{
    
    console.log(`###############`);
    console.log(`Estoy en el try`);
    console.log(`###############`);
    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false
    })
    
    const salt = bcrypt.genSaltSync(10);

    if(password.length > 3){
        const hashPassword = bcrypt.hashSync(password, salt);
        user.password = hashPassword;
    }else{
        res.status(400).send({msg: "La contraseña debe tener mas de 3 caracteres"})
    }

    if(!email){
        res.status(400).send({msg: "El email es obligatorio"});
    }else{
        const userStorage = await user.save();
        res.status(200).send({msg: userStorage});
    }
    
}catch(error){
    console.log(`##########################`);
    console.log(`Estoy en el catch ${error}`);
    console.log(`##########################`);
    res.status(400).send({msg: "Error al crear usuario"})
}

}

let login = async (req,res) => {
    const {email, password} = req.body;

    try {
        if(!email){
            res.status(400).send({msg: "El email es obligatorio"})
        } else if(!password) {
            res.status(400).send({msg:"La contraseña es obligatoria"})
        }else{
            const emailToLowerCase = email.toLowerCase();
            let userStore = await User.findOne({ email: emailToLowerCase});
            bcrypt.compare(password, userStore.password, (error, check) => {
                if(error){
                    res.status(500).send({msg: "Error del servidor"})
                } else if (!check){
                    res.status(500).send({msg:"Contraseña incorrecta"})
                } else if (!userStore.active) {
                    res.status(401).send({msg: "usuario no activo"})
                } else {
                    res.status(200).send({
                        access: jwt.createAccesToken(userStore),
                        refresh: jwt.createRefreshToken(userStore)
                    })
                }
            })
        }

    } catch (error){
        console.log(error);
    }

}

module.exports = {
    register,
    login
};