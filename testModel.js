// pruebaModel.js
var mongoose = require('mongoose');
// Setup schema
var testSchema = mongoose.Schema({
    aplication_id: {
        type: String,
        required: true
    },
    type_test: {
        type: String,
        required: true,
        enum: ['Web','Movil']
    },
    tests: [
        {
            id_test: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true,
                enum: ['e2e', 'bdt','random','datos','headless_small_chrome','headless_medium_chrome','headless_large_chrome','headless_firefox','mutation']
            },
            description: {
                type: String,
                required: true
            },
            script: {
                type: String,
                requiered: true
            },
            run_vrt: Boolean,
            test_path: String
        }
    ], 
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Prueba model
var Test = module.exports = mongoose.model('test', testSchema);
module.exports.get = function (callback, limit) {
    Test.find(callback).limit(limit);
}