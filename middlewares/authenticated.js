const jwt = require("../utils/jwt");

const confirmacionAutenticacion = (req ,res ,next ) => {
    if(!req.headers.authorization){
        res.status(500).send({msg: "La peticion no tiene la cabecera de autenticacion"})
    }
    console.log("Todo bien, puede continuar");
    next();

    const token = req.headers.authorization.replace("Bearer ", "")
    console.log(token);

    try {
        const payload = jwt.decoder(token);
        console.log(payload);

        const { exp } = payload;
        const currentDate = new Date().getTime();

        //Comprobamos si la fecha de expriacion del token es menor a la fecha actual

        if(exp <= currentDate){
            return res.status(400).send({msg: "El token ha caducado"})
        } else {
            req.user = payload;
            next();
        }

    } catch (error) {
       return res.status(400).send({msg: "token invalido"})
    }
}


module.exports = confirmacionAutenticacion;
    