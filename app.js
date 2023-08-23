const express = require("express");
const {API_VERSION} = require("./constants");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: '*',
  }));

//Import routings
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
const menuRoutes = require('./router/menu');
const courseRoutes = require('./router/course');
const postRoutes = require('./router/post');
const newsletterRoutes = require('./router/newsletter');


//Configuring body parser para poder mandar contenido JSON en el body.
app.use(bodyParser.urlencoded({extended : true}))

//Nuestro servidor es capaz de recibir JSON en el body de la peticion
app.use(bodyParser.json())

//Configurando static folder
app.use(express.static("uploads"));

//Configure header HTTP - CORS

//Configuracion de las rutas
app.use(`/auth`,authRoutes);
app.use(`/user`,userRoutes);
app.use('/menu',menuRoutes);
app.use('/courses',courseRoutes);
app.use(`/posts`, postRoutes);
app.use(`/newsletter`, newsletterRoutes);

module.exports = app;