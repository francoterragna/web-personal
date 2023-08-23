const Newsletter = require('../models/newsletter');

const suscribeEmail = async (req,res)  => {
    try {
        const {email} = req.body;
        if(!email) res.status(400).send({msg:'Debe ingresar un email'})
        const newsletter = new Newsletter({
            email: email.toLowerCase()
        });
        const emailStored = await newsletter.save();
        res.status(200).send({msg: `Email registrado correctamente`, emailStored});

    } catch (error) {
        res.status(400).send({msg: 'El email ya está registrado'})
    }
};

const getEmails = (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    };

    Newsletter.paginate({}, options, (error, emailsStored) => {
        if(error) {
            res.status(400).send({msg: 'Error al obtener los emails'})
        } else {
            res.status(200).send(emailsStored);
        }
    })
}

const deleteEmail = async (req,res) => {
    const { id } = req.params;

    await Newsletter.findByIdAndDelete(id)
    .then(deletedEmail => {
        res.status(200).send({msg: `El mail ${deletedEmail.email} ha sido eliminado`})
    })
    .catch(error => {
        res.status(400).send({msg: "Ha ocurrido un error al eliminar el mail", err: error});
    })
}

module.exports= {
    suscribeEmail,
    getEmails,
    deleteEmail
};