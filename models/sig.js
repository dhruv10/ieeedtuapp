let mongoose = require('mongoose');

//SIG Schema
let sigSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	mentors:{
		type: String,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	date:{
		type: String,
		required: true
	},
	time:{
		type: String,
		required: true
	},
	contact:{
		type: String,
		required: true
	}
});

let SIG = module.exports = mongoose.model('SIG',sigSchema);