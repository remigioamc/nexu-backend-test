const express = require('express');  /// se importa express
const app = express(); //se crea instancia de express
//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");//se importa mongoose
mongoose.connect(
    "mongodb+srv://karina:karina123@cluster0.87v2vjl.mongodb.net/nexu?retryWrites=true&w=majority"
); //se configura la conexión a mongoDB
mongoose.set("debug", true);

require('./models/Model');

//Configurando las rutas (api version 1)
app.use('/v1', require('./routes'));

const PORT = 4001;
app.listen(PORT, () => {  //se inicia un servidor que escuchará las peticiones que se hagan a la API
  console.log(`Server is listening on port ${PORT}`);
});