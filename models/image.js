// Loading external packages
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var path = require("path");

// Creating a new schema
var ImageSchema = new Schema({
    title: {type: String},
    description: {type: String},
    filename: {type: String},
    views: {type: Number, 'default': 0},
    likes: {type: Number, 'default': 0},
    timestamp: {type: Date, 'default': Date.now()}
});

// Virtuals
ImageSchema.virtual('uniqueId').
get(function(){
    // Removing extension from filename
    var file = this.filename;
    return this.filename.replace(
        path.extname(this.filename),'');
});

// Exporting Model
module.exports = mongoose.model('Image', ImageSchema);