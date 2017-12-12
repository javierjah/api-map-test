
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var config = require('./.env.js')
var router = require('./app/routes')

// configure app
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// DATABASE SETUP
var mongoose = require('mongoose');
mongoose.connect(config.mongo.uri);

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// REGISTER OUR ROUTES ----------------------
app.use('/api', router);

// START THE SERVER
// ==========================================
app.listen(port);
console.log('Start maps API in port:  ' + port);
