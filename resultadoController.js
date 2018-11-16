// setPruebasController.js
// Import model
Resultado = require('./resultadoModel');
// Handle index actions
exports.index = function (req, res) {
    if(req.query && req.query.ejecucion){
        Resultado.find({ejecucion:req.query.ejecucion}, function (err, resultados) {
            if (err){
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Consulta de colección de resultados por ejecucion",
                data: resultados
            });
        });
    }else{
        Resultado.get(function (err, resultados) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Consulta de colección de ejecuciones",
                data: resultados
            });
        });
    }
};
// Handle create app actions
exports.new = function (req, res) {
    var resultado = new Resultado(req.body);
    // save the app and check for errors
    resultado.save(function (err) {
        if (err)
             res.json(err);
        res.json({
            message: 'Nueva ejecución creada!',
            data: resultado
        });
    });
};
// Handle view app info
exports.view = function (req, res) {
    Resultado.findById(req.params.ejecucion_id, function (err, resultado) {
        if (err)
            res.send(err);
        res.json({
            message: 'Valores de ejeucución..',
            data: resultado
        });
    });
};
// Handle update app info
exports.update = function (req, res) {
    console.log(req.body);
    Resultado.findById(req.params.resultado_id, function (err, resultado) {
        if (err)
            res.send(err);
            resultado.ejecucion = req.body.ejecucion;
            resultado.nombrePrueba = req.body.nombrePrueba;
            resultado.idPrueba = req.body.idPrueba;
            resultado.estado = req.body.estado;
            resultado.tipoPrueba= req.body.tipoPrueba;
            resultado.resultados = req.body.resultados;
        
        // save the app and check for errors
        resultado.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Ejecucion actualizada',
                data: resultado
            });
        });
    });
};

// Handle delete app
exports.delete = function (req, res) {
    Resultado.remove({
        _id: req.params.resultado_id
    }, function (err, resultado) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Ejecución eliminada'
        });
    });
};
/*
// Handle update app info
exports.update = function (req, res) {
    console.log(req.body);
    req.params.resultado_id
    
    Resultado.find({ejecucion:req.params.idEjecucion}, function (err, resultado) {
        if (err)
            res.send(err);
            /*resultado.setPrueba = req.body.setPrueba;
            ejecucion.aplicacion = req.body.aplicacion;
            ejecucion.prueba = req.body.prueba;
            ejecucion.estado = req.body.estado;*/
        
        // save the app and check for errors
  /*      res.json({
            message: 'Ejecucion actualizada',
            data: resultado
        });
    });
};
posts.find({author:"Daniel"}).toArray(function(err, results){
    console.log(results); // output all records
});*/