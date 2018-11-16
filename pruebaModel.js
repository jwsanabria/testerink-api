// pruebaModel.js
var mongoose = require('mongoose');
// Setup schema
var setPruebaSchema = mongoose.Schema({
    aplicacion: {
        type: String,
        required: true
    },
    arrayPruebas: [
        {
            idPrueba: {
                type: String,
                required: true
            },
            tipoPrueba: {
                type: String,
                required: true
            },
            nombrePrueba: {
                type: String,
                required: true
            },
            script: {
                type: String,
                requiered: true
            }
        }
    ], 
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Prueba model
var SetPrueba = module.exports = mongoose.model('prueba', setPruebaSchema);
module.exports.get = function (callback, limit) {
    SetPrueba.find(callback).limit(limit);
}