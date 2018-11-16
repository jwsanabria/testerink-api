// contactController.js
// Import contact model
Aplicacion = require('./applicationModel');
// Handle index actions
exports.index = function (req, res) {
    console.log("consulta de apps");
    Aplicacion.get(function (err, apps) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Apps retrieved successfully",
            data: apps
        });
    });
};
// Handle create app actions
exports.new = function (req, res) {
    var app = new Aplicacion(req.body);
    console.log(req.body);
    app.nombre = req.body.nombre ? req.body.nombre : "Sin Nombre";
    app.tipo = req.body.tipo;
    app.url_pruebas = req.body.url_pruebas;
    app.url_github = req.body.url_github;
    app.url_apk = req.body.url_apk;
    // save the app and check for errors
    app.save(function (err) {
        if (err)
             res.json(err);
        res.json({
            message: 'New app created!',
            data: app
        });
    });
};
// Handle view app info
exports.view = function (req, res) {
    console.log("consulta de app");
    Aplicacion.findById(req.params.aplicacion_id, function (err, app) {
        if (err)
            res.send(err);
        res.json({
            message: 'App details loading..',
            data: app
        });
    });
};
// Handle update app info
exports.update = function (req, res) {
    console.log(req.body);
Aplicacion.findById(req.params.aplicacion_id, function (err, app) {
        if (err)
            res.send(err);
        app.nombre = req.body.nombre ? req.body.nombre : app.nombre;
        app.tipo = req.body.tipo;
        app.url_pruebas = req.body.url_pruebas;
        app.url_github = req.body.url_github;
        app.url_apk = req.body.url_apk;
        // save the app and check for errors
        app.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'App Info updated',
                data: app
            });
        });
    });
};
// Handle delete app
exports.delete = function (req, res) {
    Aplicacion.remove({
        _id: req.params.aplicacion_id
    }, function (err, app) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'App deleted'
        });
    });
};