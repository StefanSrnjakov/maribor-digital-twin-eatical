var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var mealSchema = new Schema({
	'name' : String,
	'allergens' : [{type: Schema.Types.ObjectId, ref: 'allergen'}],
	'category' : [{type: Schema.Types.ObjectId, ref: 'category'}],
	'price' : Number,
	'restaurant_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'restaurant'
	},
	'size' : String
});

module.exports = mongoose.model('meal', mealSchema);
