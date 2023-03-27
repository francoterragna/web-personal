const mongoose = require("mongoose");
const app = require("./app")
const {
    DB_HOST,
    DB_PASSWORD,
    DB_USER,
    API_VERSION,
    IP_SERVER
} = require("./constants");


const connectDB = async () => {
  const PORT = process.env.POST || 3977;
    try {
      await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`)
  
      app.listen(PORT, () => {
        console.log("####################");
        console.log("##### API REST #####");
        console.log("####################");
        console.log(`http://${IP_SERVER}:${PORT}`);
        // console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
      })
    } catch (err) {
      console.log('Error al conectar a la base de datos', err);
    }
  }
  
  connectDB();