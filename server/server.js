var express = require('express');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
var mysql = require('mysql');
var api = require('./api/todoApi');
// Initialize Express App
var app = express();
var http = require('http');

var cors = require('cors');
app.use(cors({ origin: 'http://localhost:4200' })); 

// Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Path
app.use('/', express.static(__dirname));

// Import API Routes
app.use(api);


port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log("listening to port " + port);
})

