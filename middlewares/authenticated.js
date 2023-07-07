const jwt = require("../utils/jwt");

function confirmacionAutenticacion (req ,res ,next ) {
    if(!req.headers.authorization){
        res.status(500).send({msg: "La peticion no tiene la cabecera de autenticacion"});
    }
    

    const token = req.headers.authorization.replace("Bearer ", "")

    try {
        const payload = jwt.decoder(token); //Decodificamos el token y lo guardamos en payload
        //console.log(payload); // El token decodificado devuelve un objeto

        const { exp } = payload; // extraemos la key exp del objeto payload, que es el id del usuario.
        const currentDate = new Date().getTime();

        //Comprobamos si la fecha de expriacion del token es menor a la fecha actual

        if(exp <= currentDate) return res.status(400).send({msg: "El token ha caducado"})
            
            req.user = payload;
            console.log("------------ Middleware authenticated accepted ------------");
            next();


    } catch (error) {
       return res.status(400).send({msg: "token invalido"})
    }
}


module.exports = {
    confirmacionAutenticacion
};
    