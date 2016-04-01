var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar');

module.exports = {
    index: function(req, res){
        // Creating a viewModel
        var viewModel = {
            image: {
                uniqueId: 1,
                title: "Sample Image 1",
                description: '',
                filename: 'sample1.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now()
            },
            comments: [
                {
                    image_id: 1,
                    email: 'test@testing.com',
                    name: 'Test Tester',
                    gravatar: 'http://lorempixel.com/75/75/animals/1',
                    comment : "This is a test comment",
                    timestamp: Date.now()
                },
                {
                   image_id: 2,
                    email: 'test@testing.com',
                    name: 'Test Tester',
                    gravatar: 'http://lorempixel.com/75/75/animals/2',
                    comment : "This is a test comment",
                    timestamp: Date.now()
                }
            ]
        };
        sidebar(viewModel, function(viewModel){
           res.render('image', viewModel); 
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
            // creating the storing path            
            var tempPath = req.files[0].path,
                ext = path.extname(req.files[0].originalname).toLowerCase(),
                targetPath = path.resolve('./public/upload/' + imgUrl + ext);
                console.log(">> ext: " + ext);
                console.log(">> targetPath: %s", targetPath);
            if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
                fs.rename(tempPath, targetPath, function(err){
                    if(err) throw err;
                    res.redirect('/images/' + imgUrl);
                });
            }else{
                // unlink borra el archivo
                fs.unlink(tempPath, function(err){
                    if(err) throw err;
                    console.log(">> DELTED FILE: %s", tempPath);
                    res.status(500).json({error: 'Solo los archivos de imagenes estan permitidos'});
                });
            }
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