// ejecucionModel.js
var mongoose = require('mongoose');
// Setup schema
var resultadoSchema = mongoose.Schema({
    ejecucion: {
        type: String,
        required: true
    },
    idPrueba:{
        type: String,
        required: true
    },
    nombrePrueba:{
        type: String,
        required: true
    },
    tipoPrueba:{
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
var Resultado = module.exports = mongoose.model('resultado', resultadoSchema);
module.exports.get = function (callback, limit) {
    Resultado.find(callback).limit(limit);
}