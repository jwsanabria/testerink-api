// aplicationController.js
// Import contact model
Aplication = require('./applicationModel');
// Handle index actions
exports.index = function (req, res) {
    Aplication.get(function (err, apps) {
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
    var app = new Aplication(req.body);
    app.name = req.body.name ? req.body.name : "Sin Nombre";
    app.type = req.body.type;
    app.url_test = req.body.url_test;
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
    Aplication.findById(req.params.aplication_id, function (err, app) {
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
    Aplication.findById(req.params.aplication_id, function (err, app) {
        if (err)
            res.send(err);
        app.name = req.body.name ? req.body.name : app.name;
        app.type = req.body.type;
        app.url_test = req.body.url_test;
        app.url_github = req.body.url_github;
        app.url_apk = req.body.url_apk;
        app.version = req.body.version
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
    Aplication.remove({
        _id: req.params.aplication_id
    }, function (err, app) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'App deleted'
        });
    });
};