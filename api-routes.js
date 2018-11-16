// api-routes.js
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import app controller
var appController = require('./applicationController');
// Aplicacion routes
router.route('/apps')
    .get(appController.index)
    .post(appController.new);
router.route('/apps/:aplicacion_id')
    .get(appController.view)
    .patch(appController.update)
    .put(appController.update)
    .delete(appController.delete);

// Import test controller
var setPruebasController = require('./setPruebasController');
// Aplicacion routes
router.route('/setPruebas')
    .get(setPruebasController.index)
    .post(setPruebasController.new);
router.route('/setPruebas/:setPruebas_id')
    .get(setPruebasController.view)
    .delete(setPruebasController.delete);

    // Import ejecucion controller
var ejecucionController = require('./ejecucionController');
// Aplicacion routes
router.route('/ejecucion')
    .get(ejecucionController.index)
    .post(ejecucionController.new);
router.route('/ejecucion/:ejecucion_id')
    .get(ejecucionController.view)
    .patch(ejecucionController.update)
    .put(ejecucionController.update)
    .delete(ejecucionController.delete);


// Import ejecucion controller
var resultadoController = require('./resultadoController');
// Aplicacion routes
router.route('/resultado')
    .get(resultadoController.index)
    .post(resultadoController.new);
router.route('/resultado/:resultado_id')
    .get(resultadoController.view)
    .patch(resultadoController.update)
    .put(resultadoController.update)
    .delete(resultadoController.delete);
    // Export API routes
module.exports = router;