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

// Import S3 controller
var s3Controller = require('./s3Controller');
router.post('/upload')
    .post(s3Controller.upload);

// Import app controller
var appController = require('./applicationController');
// Aplicacion routes
router.route('/apps')
    .get(appController.index)
    .post(appController.new);
router.route('/apps/:aplication_id')
    .get(appController.view)
    .patch(appController.update)
    .put(appController.update)
    .delete(appController.delete);

// Import test controller
var testController = require('./testController');
// Test routes
router.route('/test')
    .get(testController.index)
    .post(testController.new);
router.route('/test/:test_id')
    .get(testController.view)
    .delete(testController.delete);

    // Import execution controller
var executionController = require('./executionController');
// Execution routes
router.route('/execution')
    .get(executionController.index)
    .post(executionController.new);
router.route('/execution/:execution_id')
    .get(executionController.view)
    .patch(executionController.update)
    .put(executionController.update)
    .delete(executionController.delete);


// Import execution controller
var resultController = require('./resultController');
// Result routes
router.route('/result')
    .get(resultController.index)
    .post(resultController.new);
router.route('/result/:result_id')
    .get(resultController.view)
    .patch(resultController.update)
    .put(resultController.update)
    .delete(resultController.delete);
    // Export API routes
module.exports = router;