/* global __dirname */
// importing dependencies
var path = require('path'),
    routes = require('./routes'),
    exphdb = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler');

module.exports = function(app){
    // Inserting midleware
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended': true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('alugn-valor-secreto-aqui'));
    
    // Moving the routes to router folder
    routes(app);
    
    // Static midleware is put at the end
    app.use('/public/',
    express.static(path.join(__dirname, '../public')));
    if('development' === app.get('env')){
        app.use(errorHandler());
    }
    return app;
};