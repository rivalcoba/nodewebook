var Stats = require("./stats"),
    Images = require("./images"),
    Comments = require("./comments"),
    async = require('async');

module.exports = function(viewModel, callback){
    async.parallel([
        function(next){
            console.log("> Stats invoked...");
            Stats(next);
        }, function(next){
            console.log("> Images invoked...");
            Images.popular(next);
        }, function(next){
            console.log("> Comments invoked...");
            Comments.newest(next);
        }
    ], function(err, results){
        console.log(">results: "+ JSON.stringify(results));
        viewModel.sidebar = {
            stats: results[0],
            popular: results[1],
            comments: results[2]
        };
        callback(viewModel);
    });
};