// setPruebasController.js
// Import model
Ejecucion = require('./ejecucionModel');
// Handle index actions
exports.index = function (req, res) {
    if(req.query && req.query.estado){
        Ejecucion.find({estado:req.query.estado}, function (err, ejecuciones) {
            if (err){
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Consulta de colección de ejecuciones por estado",
                data: ejecuciones
            });
        });
    }else{
        Ejecucion.get(function (err, ejecuciones) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Consulta de colección de ejecuciones",
                data: ejecuciones
            });
        }
    });
};
// Handle create app actions
exports.new = function (req, res) {
    var ejecucion = new Ejecucion(req.body);
    /*app.nombre = req.body.nombre ? req.body.nombre : "Sin Nombre";
    app.tipo = req.body.tipo;
    app.url_pruebas = req.body.url_pruebas;
    app.url_github = req.body.url_github;
    app.url_apk = req.body.url_apk;*/
    ejecucion.estado="Registrada";
    // save the app and check for errors
    ejecucion.save(function (err) {
        if (err)
             res.json(err);
        res.json({
            message: 'Nueva ejecución creada!',
            data: ejecucion
        });
    });
};
// Handle view app info
exports.view = function (req, res) {
    Ejecucion.findById(req.params.ejecucion_id, function (err, ejecucion) {
        if (err)
            res.send(err);
        res.json({
            message: 'Valores de ejeucución..',
            data: ejecucion
        });
    });
};
// Handle update app info
exports.update = function (req, res) {
    console.log(req.body);
Ejecucion.findById(req.params.ejecucion_id, function (err, ejecucion) {
        if (err)
            res.send(err);
            ejecucion.setPrueba = req.body.setPrueba;
            ejecucion.aplicacion = req.body.aplicacion;
            ejecucion.prueba = req.body.prueba;
            ejecucion.estado = req.body.estado;
        
        // save the app and check for errors
        ejecucion.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Ejecucion actualizada',
                data: ejecucion
            });
        });
    });
};

// Handle delete app
exports.delete = function (req, res) {
    Ejecucion.remove({
        _id: req.params.ejecucion_id
    }, function (err, ejecucion) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Ejecución eliminada'
        });
    });
};