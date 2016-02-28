/* global process */
/* global __dirname */

// Importing express framework
var express = require('express');
// Getting configuration
var config = require('./server/configure');
// Getting app instance
var app = express();
// Setting some configuration
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '127.0.0.1');
app.set('views', __dirname + '/views');
app = config(app);

// Routing
/*app.get('/', function(req, res){
    res.send('Hola ITGAM');
});*/
// Starting Server
app.listen(app.get('port'), app.get('ip'), function(){
    console.log("> Server listenig @http://%s:%s",
    app.get('ip'), app.get('port'));
});