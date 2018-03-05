var express = require('express');
var app = express();

// Import todo Module Containing Functions Related To todo Data
var todo = require('../models/todo');

// API Routes
app.get('/todo', function (req, res) {
	todo.findAll()
		.then(success => {
			res.json(success);
			console.log("get  task success", success)
		}).catch(error => {
			res.json(error);
			console.log("get task error", error)
		})
});

app.post('/todo', function (req, res) {
	var data = req.body.id;
	console.log("get single data", data);
	todo.findOne(data)
		.then(success => {
			res.json(success);
			console.log("get single task success", success)
		}).catch(error => {
			res.json(error);
			console.log("get single task error", error)
		})
});

app.post('/addtodo', function (req, res, next) {
	var data = req.body;
	console.log("add data", data);
	todo.addTask(data)
		.then(success => {
			res.json(success);
			console.log("add single task success", success)
		}).catch(error => {
			res.json(error);
			console.log("add single task error", error)
		})
});
app.put('/updatetodo', function (req, res, next) {
	var data = req.body;
	todo.updateTask(data)
		.then(success => {
			res.json(success);
			console.log("update single task success", success)
		}).catch(error => {
			res.json(error);
			console.log("update single task error", error)
		})
});
app.post('/deletetodo', function (req, res) {
	console.log(req.body);
	var data = req.body.id;
	todo.deleteTask(data)
		.then(success => {
			res.json(success);
			console.log("delete single task success", success)
		}).catch(error => {
			res.json(error);
			console.log("delete single task error", error)
		})

});

module.exports = app;
