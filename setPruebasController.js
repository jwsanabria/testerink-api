// setPruebasController.js
// Import model
SetPruebas = require('./pruebaModel');
// Handle index actions
exports.index = function (req, res) {
    console.log("consulta de set de pruebas");
    SetPruebas.get(function (err, setPruebas) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Set de pruebas retornado satisfactoriamente",
            data: setPruebas
        });
    });
};
// Handle create app actions
exports.new = function (req, res) {
    console.log(req.body);
    var setPruebas = new SetPruebas(req.body);
    console.log(req.body);
    /*app.nombre = req.body.nombre ? req.body.nombre : "Sin Nombre";
    app.tipo = req.body.tipo;
    app.url_pruebas = req.body.url_pruebas;
    app.url_github = req.body.url_github;
    app.url_apk = req.body.url_apk;*/
    // save the app and check for errors
    setPruebas.save(function (err) {
        if (err)
             res.json(err);
        res.json({
            message: 'Nuevo set de pruebas creado!',
            data: setPruebas
        });
    });
};
// Handle view app info
exports.view = function (req, res) {
    console.log("consulta de app");
    SetPruebas.findById(req.params.setPruebas_id, function (err, app) {
        if (err)
            res.send(err);
        res.json({
            message: 'Detalles del set de pruebas..',
            data: app
        });
    });
};
// Handle delete app
exports.delete = function (req, res) {
    SetPruebas.remove({
        _id: req.params.setPruebas_id
    }, function (err, app) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Set de pruebas eliminado'
        });
    });
};