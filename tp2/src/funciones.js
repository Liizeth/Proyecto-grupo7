
function verificarConexion(client, res) {
    if (!client) {
        res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
        return false;
    }
    return true;
};


function validarCampos(nue, camposValidos) {
  const datosvalidos = {};
  for (const campo in nue) {// campo toma el valor de cada uno de los campos que se pasaron por el body (nue)
    if (camposValidos.includes(campo)) {
      datosvalidos[campo] = nue[campo];
    }
  }
  //solo acepta los campos de la db (los definidos en campos validos) y si tiene mas campos los saca

  return datosvalidos;
};

function camposObligatorios(nue, camposdb) {
  return camposdb.every(campo => nue.hasOwnProperty(campo));//campo seria una var que va a toma el valor de cada campobd y pregunta si nue lo tiene
};

module.exports={
        verificarConexion,
        validarCampos,
        camposObligatorios
   };
