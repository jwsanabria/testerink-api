// applicationModel.js
var mongoose = require('mongoose');
// Setup schema
var aplicacionSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    version: String,
    url_pruebas: String,
    url_github: String,
    url_apk: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Aplicacion model
var Aplicacion = module.exports = mongoose.model('aplicacion', aplicacionSchema);
module.exports.get = function (callback, limit) {
    Aplicacion.find(callback).limit(limit);
}