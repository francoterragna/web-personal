const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    title: String, // Titulo del menu
    path: String, // La ruta de la info del menu
    order: Number, // Para saber el orden del menu, si va primero segundo o tercero etc.
    active: Boolean  //Para saber si la publicacion esta activa o no.
})

module.exports = mongoose.model("Menu", MenuSchema);