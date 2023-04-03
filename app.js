const express = require("express");
const {API_VERSION} = require("./constants");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//Import routings
const authRoutes = require("./router/auth");
const userRoutes = require('./router/user');
const menuRoutes = require('./router/menu');


//Configuring body parser para poder mandar contenido JSON en el body.
app.use(bodyParser.urlencoded({extended : true}))

//Nuestro servidor es capaz de recibir JSON en el body de la peticion
app.use(bodyParser.json())

//Configurando static folder
app.use(express.static("uploads"));

//Configure header HTTP - CORS
app.use(cors());

//Configuracion de las rutas
app.use(`/auth`,authRoutes);
app.use(`/user`,userRoutes);
app.use('/menu',menuRoutes);

module.exports = app;