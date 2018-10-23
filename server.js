const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Connecting to database
// mongoose.connect('mongodb://localhost/ieeedtuapp');
// connecting mlab
mongoose.connect('mongodb://apple123:orange123@ds237713.mlab.com:37713/ieeedtuapp');
let db = mongoose.connection;

//Check for DB connection
db.once('open', function(){
	console.log('Connected to MongoDB');
})

//Check for DB error
db.on('error', function(err){
	console.log(err);
});

// Init App
const app = express();

//Bring in projects from DB
let Project = require('./models/project');

// Body parser Middleware
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// parse app/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public'))); 

// Home Route
app.get('/projects', function(req, res){

	// res.send('hello world');
	// res.json(projects);
	Project.find({},function(err, projects){
		if(err){
			console.log(err);
		}
		else{
			res.json(projects);
	  }
	});
});

// Single Project Route
app.get('/projects/:id', function(req, res){
	Project.findById(req.params.id, function(err, project){
		// console.log(project);
		res.json(project);
	});
});

//Add article submit POST route
app.post('/projects/add', function(req, res){
	
	let project = new Project();
	project.title = req.body.title;
	project.developers = req.body.developers;
	project.description = req.body.description;
	project.contact = req.body.contact;

	project.save(function(err){
		if(err){
			console.log(err);
		}
		else{
			// res.redirect('/projects');
			res.send('added successfully');
		}
	});
	return;
});

 // Edit Article Form Route
app.get('/projects/edit/:id', function(req, res){
	Project.findById(req.params.id, function(err, project){
		res.json(project);
	});
});

//Edit article submit POST route
app.post('/projects/edit/:id', function(req, res){
	
	let project = {};
	project.title = req.body.title;
	project.developers = req.body.developers;
	project.description = req.body.description;
	project.contact = req.body.contact;

	let query = {_id:req.params.id}

	Project.update(query, project, function(err){
		if(err){
			console.log(err);
		}
		else{
			res.send('Edited successfully');
		}
	});
});

// Delete article route
app.delete('/projects/delete/:id', function(req, res){
	let query = {_id:req.params.id}

	Project.remove(query, function(err){
		if(err){
			console.log(err);
		}
		else{
			res.send('Project deleted successfully')
		}
	});
}); 

// Starting Server
app.listen(process.env.PORT || 5000, function(){
	console.log('Server started listening on Port 5000... ')
});