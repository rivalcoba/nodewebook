var fs = require('fs'),
    path = require('path');

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
        res.render('image', viewModel);
    },
    create: function(req, res){
        console.log("CREATE");
        // var saveImage = function(){
        //     // Generating a six digit alpha numeric code
        //     var possible = "abcdefghijklmnñopqrstuvwxyz123456789",
        //         imgUrl = '';
        //     for(var i=0; i < 6; i++){
        //         imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
        //     }
        //     // creating the storing path
        //     var temPath = req.files.file.path,
        //         ext = path.extname(req.files.file.name).toLowerCase,
        //         targetPath = path.resolve('./public/upload' + imgUrl + ext);
        //     if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
        //         fs.rename(temPath, targetPath, function(err){
        //             if(err) throw err;
        //             res.redirect('/images/' + imgUrl);
        //         });
        //     }else{
        //         fs.unlink(temPath, function(err){
        //             if(err) throw err;
        //             res.json(500, {error: 'Solo los archivos de imagenes estan permitidos'});
        //         });
        //     }
        // };
        // saveImage();
        res.send('The image:like POST controller');
    },
    like : function(req, res){
        res.send('The image:like POST controller');
    },
    comment: function(req, res){
        res.send('The image:comment POST controller');
    }
}