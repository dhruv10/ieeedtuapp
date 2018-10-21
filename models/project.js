let mongoose = require('mongoose');

//Project Schema
let projectSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	developers:{
		type: String,
		required: true
	},
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