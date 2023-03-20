const express = require("express");
const {API_VERSION} = require("./constants");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//Import routings
const authRoutes = require("./router/auth");
//Configuring body parser para poder mandar contenido JSON en el body.
app.use(bodyParser.urlencoded({extended : true}))

//Nuestro servidor es capaz de recibir JSON en el body de la peticion
app.use(bodyParser.json())

//Configurando static folder
app.use(express.static("uploads"));

//Configure headre HTTP - CORS
app.use(cors());

//Configuracion de las rutas
app.use(`/api/${API_VERSION}`,authRoutes)

module.exports = app;

