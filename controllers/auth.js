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
            let userStore = await User.findOne({ email: emailToLowerCase}); // el "User" viene de los modelos creados en ../models/user.js, el findOne es un método de mongoose.
            bcrypt.compare(password, userStore.password, (error, check) => {
                if(error){
                    res.status(500).send({msg: "Error del servidor"})
                } else if (!check){
                    res.status(500).send({msg:"Contraseña incorrecta"})
                } else if (!userStore.active) {
                    res.status(401).send({msg: "Usuario no activo"})
                } else {
                    res.status(200).send({
                        msg: "Usuario logueado",
                        access: jwt.createAccesToken(userStore), // Una vez que me logueo con mis credenciales, me da los token  
                        refresh: jwt.createRefreshToken(userStore)
                    })
                }
            })
        }

    } catch (error){
        res.status(500).send({msg: "Error al loguearse"});
        return;
    }

}

let refreshAccessToken = async (req,res) => { //Actualizo el access token con el refresh token
    const {token} = req.body;

    
    try{
        const {user_id} = jwt.decoder(token);
        let usuarioEncontrado = await User.findOne({_id: user_id})
        if(!usuarioEncontrado){
            res.status(500).send({msg: "Error del servidor"})
        } else {
            res.status(200).send({
                accessToken: jwt.createAccesToken(usuarioEncontrado)
            })
            console.log("Todo flama");
        }
    } catch (error){
        res.status(500).send({msg:"Error del servidor"});
        console.log(error);
    }

}

module.exports = {
    register,
    login,
    refreshAccessToken
};