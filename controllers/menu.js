const Menu = require('../models/menu');

const createMenu = async (req,res) => {
    const menu = new Menu(req.body);

    try {
       const menuStored = await menu.save();
       res.status(200).send(menuStored);
    } catch (error) {
        res.status(400).send({msg: error})
    }

    // const getMenus = async (req, res)  => {
    //     const {active} = req.query; // El req.query viene de la URL despues del "?"
    //     if(active != undefined) console.log("active ->", active);
    //     let response = null;
    
    
    //     //Por medio de las query le podemos pedir que busque los activos, inactivos o ambos
    //     if(active == undefined){
    //         response = await Menu.find();
    //     } else {
    //         response = await Menu.find({active});
    //     }
    //     res.status(200).send(response);
    // }
}

const getMenus = async (req, res) => {
    try{
        const {active} = req.query; // El req.query viene de la URL despues del "?"
        if(active != undefined) console.log("active ->", active);
        let response = null;
    
        //Por medio de las query le podemos pedir que busque los activos, inactivos o ambos
        if(active == undefined){
            response = await Menu.find();
        } else {
            response = await Menu.find({active});
        }
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({msg: error})
    }

}

module.exports = {
    createMenu,
    getMenus
    
}