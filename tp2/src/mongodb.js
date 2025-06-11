require('dotenv').config();

console.log('MONGODB_URI:', process.env.MongoDB_URLString); // muetra si leer bien 


const { MongoClient } = require('mongodb');

const URI=process.env.MongoDB_URLString;
const client =new MongoClient(URI);


//funcion para conectarse 
async function connetToMongoDB() {
    try{
        await client.connect();
        return client;

    }catch(error){
        console.error('error al conectarse',error);
        return null;
    }
}

// funcion para desconectarse 

async function disconnetFromMongoDB() {
    try{
        await client.close();
        console.log('desconectado');
    }catch(error){
        console.log('error al desconectarse',error);
    }
}

//exporta las funciones para poder usarlas en server.js

module.exports={connetToMongoDB,disconnetFromMongoDB};
