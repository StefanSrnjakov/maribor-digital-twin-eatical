const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
	'username' : {
		type: String,
		required: true,
		min: 3,
		max: 255
	},
	'password' : {
		type: String,
		required: true,
		min: 8,
		max: 255
	},
	'email' : {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	'name' : {
		type: String,
		required: true,
		min: 3,
		max: 20
	},
	'surname' : {
		type: String,
		required: true,
		min: 6,
		max: 20
	},
	'telephone' : {
		type: String,
		required: true,
		min: 6,
		max: 20
	},
	'image_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'image'
	},
	'orders' : [{type: Schema.Types.ObjectId, ref: 'order'}]
});

module.exports = mongoose.model('user', userSchema);
