var models = require('../models');
var async = require('async');

var attachImage = function(comment, next){
    models.Image.findOne({
        _id:comment.image_id
    },function(err, image){
        if(err) throw err;
        comment.image = image;
        next(err);
    });
}

module.exports = {
    newest: function(callback){
        models.Comment.find({},{},{
            limit: 5, sort: {'timestamp': -1}
        },function(err, comments){
            async.each(comments, attachImage, function(err){
                if(err) throw err;
                callback(err, comments);
            });
        });
    }
};