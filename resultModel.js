// resultModel.js
var mongoose = require('mongoose');
// Setup schema
var resultSchema = mongoose.Schema({
    execution_id: {
        type: String,
        required: true
    },
    id_test:{
        type: String,
        required: true
    },
    name_test:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ['Web','Movil']
    },
    type_test:{
        type: String,
        required: true,
        enum: ['e2e', 'bdt','random','datos','headless_small_chrome','headless_medium_chrome','headless_large_chrome','headless_firefox','mutation']
    },
    state: {
        type: String,
        required: true,
        enum: ['Executed','Pending']
    },
    path_results: {
        type: String,
        required: false
    }, 
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Prueba model
var Result = module.exports = mongoose.model('result', resultSchema);
module.exports.get = function (callback, limit) {
    Result.find(callback).limit(limit);
}