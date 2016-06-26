var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Creando el esquema
var CommentSchema = new Schema({
    image_id: {type: ObjectId},
    email: {type: String},
    name: {type: String},
    gravatar: {type: String},
    comment: {type: String},
    timestamp: {type: Date, 'default': Date.now()}
});

// Create a virtual
CommentSchema.virtual('image').set(function(image){
    this._image = image;
}).get(function(){
    return this._image;
});

// Exporting Model
module.exports = mongoose.model('Comment',CommentSchema);