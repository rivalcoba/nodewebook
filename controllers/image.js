var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar');
// Models Imports
var Models = require('../models/index');

module.exports = {
    index: function(req, res){
        // Creating a viewModel
        var viewModel = {
            image: {},
            comments: []
        };
        // Loading image from models
        Models.Image.findOne(
            {filename: {$regex: req.params.image_id}},
            function(err, image){
                if(err){throw err;}
                if(image){
                    // Increment image counter
                    image.views = image.views + 1;
                    // Loading image into the model
                    viewModel.image = image;
                    // saving image into the db
                    // using mongoose schema
                    image.save();
                    Models.Comment.find({
                        image_id: image._id // Checkid
                    },{},{
                        sort:{'timestamp': 1}
                    },(err, comments)=>{
                        if(err){throw err;}
                        viewModel.comments = comments;
                        sidebar(viewModel, function(viewModel){
                            res.render('image', viewModel);
                        });
                    });
                }else{
                    res.redirect('/');
                }
            });
    },
    create: function(req, res){
        var saveImage = function(){
            // Generating a six digit alpha numeric code
            var possible = "abcdefghijklmnñopqrstuvwxyz123456789",
                imgUrl = '';
            for(var i=0; i < 6; i++){
                imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            Models.Image.find({filename: imgUrl},(err, images)=>{
                if(images.length > 0){
                    // An image with the same name
                    // of the random genereated was found
                    saveImage();
                }else{
                    // Do all the existing work
                    // creating the storing path            
                    var tempPath = req.files[0].path,
                        ext = path.extname(req.files[0].originalname).toLowerCase(),
                        targetPath = path.resolve('./public/upload/' + imgUrl + ext);
                        console.log(">> ext: " + ext);
                        console.log(">> targetPath: %s", targetPath);
                    if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
                        fs.rename(tempPath, targetPath, function(err){
                            if(err) throw err;
                            // Create a new image model, and populate it
                            var newImg = new Models.Image({
                                title: req.body.title,
                                description: req.body.description,
                                filename: imgUrl + ext
                            });
                            // Save the new image
                            newImg.save((err, image)=>{
                                if(err) throw err;
                                console.log(`> Succefully inserted image: ${image.filename}`);
                                res.redirect('/images/' + imgUrl);
                            });
                        });
                    }else{
                        // unlink borra el archivo
                        fs.unlink(tempPath, function(err){
                            if(err) throw err;
                            console.log(">> DELTED FILE: %s", tempPath);
                            res.status(500).json({error: 'Solo los archivos de imagenes estan permitidos'});
                        });
                    }
                }
            });        
        };
        saveImage();
        //res.status(200).json(req.files[0]);
    },
    like : function(req, res){
        res.json({likes: 1});
    },
    comment: function(req, res){
        res.send('The image:comment POST controller');
    }
}