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
            response = await Menu.find().sort({order: "asc"});
        } else {
            response = await Menu.find({active}).sort({order: "asc"});
        }

        if(!response) {
            res.status(400).send({msg: "No se ha encontrado ningún menu"})
        } else {
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(400).send({msg: error})
    }

}

const updateMenus = async (req, res) => {
    const { id } = req.params;
    const menuData = req.body;

    await Menu.findByIdAndUpdate({_id: id}, menuData , {new: true})
    .then(updatedMenu => {
        res.status(200).send({
            msg:"Actualizacion correcta",
            menu: updatedMenu
        })
    })
    .catch(error => res.status(400).send(error))
}

const deleteMenu = async (req,res) => {
    const { id } = req.params;

    await Menu.findByIdAndDelete(id)
    .then(deletedMenu => {
        if(!deletedMenu){
            res.status(400).send({msg:"El menu que desea eliminar no existe"})
        } else{
            res.status(200).send({
                msg: "Menu eliminado",
                menu: deletedMenu})
        }
    }).catch(error => {
        res.status(400).send(error)
    })
}

module.exports = {
    createMenu,
    getMenus,
    updateMenus,
    deleteMenu
}