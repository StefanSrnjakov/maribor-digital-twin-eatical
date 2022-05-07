var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var mealSchema = new Schema({
	'name' : String,
	'allergens' : Array,
	'category' : Array,
	'price' : Number,
	'restaurant_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'restaurant'
	},
	'size' : String
});

module.exports = mongoose.model('meal', mealSchema);
