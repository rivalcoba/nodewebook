var models = require('../models');
var async = require('async');

module.exports = function(callback){
    async.parallel([
        function(next){
            // Images Stats
            // Due thar the signatures of
            // second parameters match
            // it is possible to use a shorthand
            models.Image.count({}, function(err,data){
                next(err, data);
            });
        }, function(next){
            // Comments Stats
            // Shorthand used due to the signarure match
            models.Comment.count({},next);
        }, function(next){
            // Views Stats
            models.Image.aggregate({
                $group : {
                    _id: '1',
                    viewsTotal: { $sum : '$views'}
                }
            }, function(err, result){
                var viewsTotal = 0;
                if(result.length > 0){
                    viewsTotal += result[0].viewsTotal;
                }
                next(null, viewsTotal);
            });
        }, function(next){
            // Likes Stats
            models.Image.aggregate({
                $group : {
                    _id: '1',
                    likesTotal : { $sum : '$likes'}
                }
            }, function(err, result){
                var likesTotal = 0;
                if(result.length > 0){
                    likesTotal += result[0].likesTotal;
                }
                next(null, likesTotal);
            });
        }
    ], function(err, results){
        callback(null,{
            images: results[0],
            comments: results[1],
            views: results[2],
            likes: results[3],
        });
    });
};