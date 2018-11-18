// applicationModel.js
var mongoose = require('mongoose');
// Setup schema
var aplicationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Web','Movil']
    },
    version: String,
    url_test: String,
    url_github: String,
    url_apk: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Aplication model
var Aplication = module.exports = mongoose.model('aplication', aplicationSchema);
module.exports.get = function (callback, limit) {
    Aplication.find(callback).limit(limit);
}