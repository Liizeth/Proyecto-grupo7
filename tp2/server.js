const dotenv=require('dotenv');
    dotenv.config();

const{MongoClient, ServerDescription}=require('mongodb');
    
const express = require('express');

const{connetToMongoDB,disconnetFromMongoDB}=require('./src/mongodb.js');//importa las funciones

const {verificarConexion,validarCampos, camposObligatorios}=require('./src/funciones.js')

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

app.get('/productos', async (req, res) => {
    try {
        const client = await connetToMongoDB();
        
        if (!verificarConexion(client, res)) return;

        const db = client.db('super');
        const superdb = await db.collection('super').find().toArray();
        await disconnetFromMongoDB();
        res.json(superdb);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


app.post('/productos',async(req,res)=>{
    const nue=req.body;
    if(nue===undefined){
       return res.status(400).send('error en el formato de datos a crear');
    }

    const camposValidos = ['codigo','nombre', 'precio', 'categoria'];
    const datoValidado = validarCampos(nue, camposValidos);

    if(!camposObligatorios(datoValidado,camposValidos)){
       return res.status(400).send('error faltan los campos obligatorios de producto');
    }

    const client =await connetToMongoDB();
    
    if (!verificarConexion(client, res)) return;

    const collection=client.db('super').collection('super');

    const existe= await collection.findOne({codigo: parseInt(datoValidado.codigo)});
        if ((existe)) {
            disconnetFromMongoDB(); // Cierra la conexión si no existe
            return res.status(404).send("Producto a agregar ya existe");
        }


        collection.insertOne(datoValidado)
        .then(()=>{
            console.log('nuevo producto creado creada');
            res.status(201).send(datoValidado);
        })
        .catch(error=>{
            console.error(error);
        })
        .finally(()=>{
            disconnetFromMongoDB();
        })

});



app.put('/productos/:codigo',async(req,res)=>{
    const codigo = parseInt(req.params.codigo);
    const nueDatos=req.body;
    
    
    
    if (isNaN(codigo)) {
        return res.status(400).json({ error: "El código debe ser un número válido" });
    }


    if (!nueDatos || Object.keys(nueDatos).length === 0) {
        return res.status(400).send('error en el formato de datos recibidos');
    }
    const client =await connetToMongoDB();
    
    const camposValidos = ['nombre', 'precio', 'categoria'];
    const datosvalidos = validarCampos(nueDatos, camposValidos);




    if (!verificarConexion(client, res)) return;

    const collection=client.db('super').collection('super');

    // Verifica si el código del producto existe
        const productoExistente = await collection.findOne({codigo});
        if (!productoExistente) {
            disconnetFromMongoDB(); // Cierra la conexión si no existe
            return res.status(404).send("Producto a modificar no encontrado.");
        }


        return collection.updateOne({codigo}, { $set: datosvalidos })
        .then((resultado)=>{

            if (resultado.updateOne===0) {
                console.log('no se encontro el prod');
                res.status(404).json({ mensaje: 'No se encontró el producto a modificar' });
            } else {
                console.log('prod modificado');
                res.status(200).json({ mensaje: 'producto modificado', datos: datosvalidos });
            }

        })
        .catch((error)=>{
            res.status(500).json({descripcion:'error al modificar el producto'});
        })
        .finally(()=>{
            disconnetFromMongoDB();
        })
});





app.delete('/productos/:codigo',async(req,res)=>{
    const codigo = parseInt(req.params.codigo); // Extrae el código del producto desde la URL y lo convierte en número
    
    if (isNaN(codigo)) {
        return res.status(400).json({ error: "El código debe ser un número válido" });
    }



    const client =await connetToMongoDB();
    
    if (!verificarConexion(client, res)) return;

    const collection= client.db('super').collection('super');
    return collection.deleteOne({codigo})

    .then((resultado)=>{

        if (resultado.deletedCount===0){
            res.status(404).send('nose encontro producto con ese codigo')
        }else{
            console.log('producto eliminado');
            res.status(204).send();
        }
    })
    .catch((error)=>{
        console.error(error);
        res.status(500).json('error al eliminar el producto');
    })
    .finally(()=>{
        disconnetFromMongoDB();
    })
});






app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});