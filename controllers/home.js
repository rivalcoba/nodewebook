var sidebar = require('../helpers/sidebar');
// Importing Image model from our 
// dictionary models
var ImageModel = require('../models').Image;

module.exports = {
    index: function (req, res) {
        // Creating a view model
        var viewModel = {
            images: []
        };
        // First Object: Query *.* all documents
        // Second Object: Projection or maps
        // Query options
        ImageModel.find({}, {}, { sort: { timestamp: -1 } }, 
        function(err, images){
            if (err) { throw err; }
            viewModel.images = images;
            sidebar(viewModel, function (viewModel) {
                console.log("> Sidebar: " + JSON.stringify(viewModel.sidebar));
                res.render('index', viewModel);
            });
        });
    }
}