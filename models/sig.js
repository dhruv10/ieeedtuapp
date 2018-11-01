let mongoose = require('mongoose');

//SIG Schema
let sigSchema = mongoose.Schema({
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
	date:{
		type: String,
		required: true
	},
	month:{
		type: String,
		required: true
	},
	time:{
		start: String,
		end: String
	}
});

let SIG = module.exports = mongoose.model('SIG',sigSchema);