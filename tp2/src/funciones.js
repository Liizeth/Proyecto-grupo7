
function verificarConexion(client, res) {
    if (!client) {
        res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        return false;
    }
    return true;
}






module.exports={
        verificarConexion

   };