const User = require('../models/user');
const bcrypt = require("bcryptjs");
const {getFilePath} = require("../utils/image");

// = OBTENER USUARIO LOGUEADO
const getMe = async (req, res) => {
    
    const { user_id } = req.user; // Saco unicamente el user_id
    
    const response = await User.findById(user_id); // En response guardo el usuario que encontró en mongo con ese id

    if(!response){
        res.status(400).send({ msg: "No se ha encontrado usuario" })
    } else {
        res.status(200).send(response)
    }

    // res.status(200).send({msg: "OK"})
}

//= OBTENER USUARIOS
const getUsers = async (req, res)  => {
    const {active} = req.query; // El req.query viene de la URL despues del "?"
    if(active != undefined) console.log("active ->", active);
    let response = null;

    //Por medio de las query le podemos pedir que busque los activos, inactivos o ambos
    if(active == undefined){
        response = await User.find();
    } else {
        response = await User.find({active});
    }
    res.status(200).send(response);
}

//= CREAR USUARIOS
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
            if(req.files.avatar){
                const imagePath = getFilePath(req.files.avatar);
                console.log(`http://localhost:3977/${imagePath}`);
                user.avatar = imagePath;
            }
            const userStorage = await user.save();
            console.log(userStorage);
            res.status(200).send(userStorage);
            return;
        }
    

    } catch(error) {
        console.log("Estoy en el catch del user controller", error);
        res.status(400).send({msg: "Error al crear el usuario"});
        return;
    }

}

//= ACTUALIZAR USUARIOS
const updateUser = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;

     //Encriptando contraseña al actualizar

    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hashPassword;
    } else {
        delete userData.password; // En caso de que no exista, o sea undefined, la eliminamos.
    }

    if(req.files.avatar) {
        const AvatarArray = req.files.avatar.path.split("\\");
        userData.avatar = `${AvatarArray[1]}/${AvatarArray[2]}` // Ruta de la imagen del avatar
    }

        await User.findByIdAndUpdate({_id: id}, userData, {new: true})
        .then(updatedUser => {
            res.status(200).send({
                msg:"Actualizacion correcta",
                user: updatedUser
            });
            return;
        })
        .catch(error => {
            res.status(400).send({
                msg: "Error al actualizar el usuario",
                err: error
            });
            return;
        })
}

//= ELIMINAR USUARIOS
const deleteUser = async (req,res) => {
    const { id } = req.params;

    await User.findByIdAndDelete(id)
    .then(deletedUser => {
        res.status(200).send({msg: `El usuario con email ${deletedUser.email} ha sido eliminado.`, user: deletedUser});
        return;
    })
    .catch(error => {
        res.status(500).send({msg:"Ha habido un error al intentar eliminar el usuario", Error: error.message})
    })
}

module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}