// ejecucionModel.js
var mongoose = require('mongoose');
// Setup schema
var ejecucionSchema = mongoose.Schema({
    setPrueba: {
        type: String,
        required: true
    },
    aplicacion:{
        type: String,
        required:true
    },
    prueba:{
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    resultados: {
        type: String,
        required: false
    }, 
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Prueba model
var Ejecucion = module.exports = mongoose.model('ejecucion', ejecucionSchema);
module.exports.get = function (callback, limit) {
    Ejecucion.find(callback).limit(limit);
}