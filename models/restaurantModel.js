var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var restaurantSchema = new Schema({
	'password' : String,
	'orders' : Array,
	'image_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'image'
	},
	'meals' : Array
});

module.exports = mongoose.model('restaurant', restaurantSchema);
