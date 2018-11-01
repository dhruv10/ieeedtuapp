let mongoose = require('mongoose');

//Project Schema
let projectSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	mentors:[{
		name: String,
		contact: String
	}],
	description:{
		type: String,
		required: true
	},
	contact:{
		type: String,
		required: true
	}
});

let Project = module.exports = mongoose.model('Project',projectSchema);