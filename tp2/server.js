const dotenv=require('dotenv');
    dotenv.config();

const{MongoClient, ServerDescription}=require('mongodb');
    
const express = require('express');

const{connetToMongoDB,disconnetFromMongoDB}=require('./src/mongodb.js');//importa las funciones

const {verificarConexion}=require('./src/funciones.js')

const app = express();
app.use(express.json());

const PORT=process.env.PORT || 3000;


app.use((req,res,next)=>{
    res.header("Content-Type", "application/json; charset =utf-8");
    next();
});







app.get('/',(req,res)=>{
    res.status(200).json({ mensaje: 'bienvenido a la db de supermercado' });

    //res.status(200).end('bienvenido a la db de supermercado');
})






app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});