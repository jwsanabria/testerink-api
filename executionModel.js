// executionModel.js
var mongoose = require('mongoose');
// Setup schema
var executionSchema = mongoose.Schema({
    test_id: {
        type: String,
        required: true
    },
    aplication_id:{
        type: String,
        required:true
    },
    state: {
        type: String,
        required: true,
        enum: ['Register', 'Executed','Pending']
    },
    type: {
        type: String,
        required: true,
        enum: ['Normal', 'Scheduler']
    }, 
    schedule:{
        type: Date
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export execution model
var Execution = module.exports = mongoose.model('execution', executionSchema);
module.exports.get = function (callback, limit) {
    Execution.find(callback).limit(limit);
}