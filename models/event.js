let mongoose = require('mongoose');

//Event Schema
let eventSchema = mongoose.Schema({
	title:{
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

let Event = module.exports = mongoose.model('Event',eventSchema);