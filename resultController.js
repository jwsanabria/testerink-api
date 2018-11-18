// resultController.js
// Import model
Result = require('./resultModel');
// Handle index actions
exports.index = function (req, res) {
    if(req.query && req.query.execution_id){
        Result.find({execution_id:req.query.execution_id}, function (err, results) {
            if (err){
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Collections of execution results",
                data: results
            });
        });
    }else{
        Result.get(function (err, results) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Collection of results",
                data: results
            });
        });
    }
};
// Handle create result actions
exports.new = function (req, res) {
    var result = new Result(req.body);
    // save the app and check for errors
    result.save(function (err) {
        if (err)
             res.json(err);
        res.json({
            message: 'New result was created!',
            data: result
        });
    });
};
// Handle view result info
exports.view = function (req, res) {
    Result.findById(req.params.execution_id, function (err, result) {
        if (err)
            res.send(err);
        res.json({
            message: 'Details of result..',
            data: result
        });
    });
};
// Handle update result info
exports.update = function (req, res) {
    Result.findById(req.params.result_id, function (err, result) {
        if (err)
            res.send(err);
        result.execution_id = req.body.execution_id;
        result.name_test = req.body.name_test;
        result.type = req.body.type;
        result.id_test = req.body.id_test;
        result.state = req.body.state;
        result.type_test= req.body.type_test;
        result.path_results = req.body.path_results;
        
        // save the app and check for errors
        result.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Result updated',
                data: result
            });
        });
    });
};

// Handle delete result
exports.delete = function (req, res) {
    Result.remove({
        _id: req.params.result_id
    }, function (err, result) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Result deleted'
        });
    });
};