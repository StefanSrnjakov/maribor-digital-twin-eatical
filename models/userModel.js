var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'username' : String,
	'password' : String,
	'email' : String,
	'name' : String,
	'surname' : String,
	'telephone' : String,
	'image_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'image'
	},
	'orders' : [{type: Schema.Types.ObjectId, ref: 'order'}]
});

module.exports = mongoose.model('user', userSchema);
