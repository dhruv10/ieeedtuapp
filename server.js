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

// Bring in projects from DB
let Project = require('./models/project');
// Bring in SIGs from DB
let SIG = require('./models/sig');
//Bring in events from DB
let Event = require('./models/event');

// Body parser Middleware
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// parse app/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public'))); 


// ****************************
// ***** Project related APIs *
// ****************************


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


// ****************************
// ***** SIG related APIs *****
// ****************************

// GET all SIGs
app.get('/sig', function(req, res){

	SIG.find({},function(err, sigs){
		if(err){
			console.log(err);
		}
		else{
			res.json(sigs);
	  }
	});
});

// Single SIG Route
app.get('/sig/:id', function(req, res){
	SIG.findById(req.params.id, function(err, sigs){
		res.json(sigs);
	});
});

//Add sig POST route
app.post('/sig/add', function(req, res){
	
	let sig = new SIG();
	sig.title = req.body.title;
	sig.mentors = req.body.mentors;
	sig.description = req.body.description;
	sig.date = req.body.date;
	sig.time = req.body.time;
	sig.contact = req.body.contact;

	sig.save(function(err){
		if(err){
			console.log(err);
		}
		else{
			res.send('added sig successfully');
		}
	});
	return;
});

// Edit SIG Route
app.get('/sig/edit/:id', function(req, res){
	SIG.findById(req.params.id, function(err, sigs){
		res.json(sigs);
	});
});

//Edit SIG submit POST route
app.post('/sig/edit/:id', function(req, res){
	
	let sig = {};
	sig.title = req.body.title;
	sig.mentors = req.body.mentors;
	sig.description = req.body.description;
	sig.date = req.body.date;
	sig.time = req.body.time;
	sig.contact = req.body.contact;

	let query = {_id:req.params.id}

	SIG.update(query, sig, function(err){
		if(err){
			console.log(err);
		}
		else{
			res.send('Edited SIG details successfully');
		}
	});
});

// Delete SIG route
app.delete('/sig/delete/:id', function(req, res){
	let query = {_id:req.params.id}

	SIG.remove(query, function(err){
		if(err){
			console.log(err);
		}
		else{
			res.send('SIG deleted successfully')
		}
	});
}); 

// ****************************
// **** Events related APIs ***
// ****************************

// GET all Events
app.get('/event', function(req, res){

	Event.find({},function(err, event){
		if(err){
			console.log(err);
		}
		else{
			res.json(event);
	  }
	});
});

// Single Event Route
app.get('/event/:id', function(req, res){
	Event.findById(req.params.id, function(err, event){
		res.json(event);
	});
});

//Add Event POST route
app.post('/event/add', function(req, res){
	
	let event = new Event();
	event.title = req.body.title;
	event.description = req.body.description;
	event.date = req.body.date;
	event.time = req.body.time;
	event.contact = req.body.contact;

	event.save(function(err){
		if(err){
			console.log(err);
		}
		else{
			res.send('Added event successfully');
		}
	});
	return;
});

// Edit Event Route
app.get('/event/edit/:id', function(req, res){
	Event.findById(req.params.id, function(err, event){
		res.json(event);
	});
});

//Edit Event submit POST route
app.post('/event/edit/:id', function(req, res){
	
	let event = {};
	event.title = req.body.title;
	event.description = req.body.description;
	event.date = req.body.date;
	event.time = req.body.time;
	event.contact = req.body.contact;

	let query = {_id:req.params.id}

	Event.update(query, event, function(err){
		if(err){
			console.log(err);
		}
		else{
			res.send('Edited Event details successfully');
		}
	});
});

// Delete Event route
app.delete('/event/delete/:id', function(req, res){
	let query = {_id:req.params.id}

	Event.remove(query, function(err){
		if(err){
			console.log(err);
		}
		else{
			res.send('Deleted Event successfully')
		}
	});
}); 

// Starting Server
app.listen(process.env.PORT || 5000, function(){
	console.log('Server started listening on Port 5000... ')
});