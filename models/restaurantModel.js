var mongoose = require('mongoose');
const {number} = require("@google/maps/lib/internal/validate");
var Schema   = mongoose.Schema;

var restaurantSchema = new Schema({
	'username' : String,
	'password' : String,
	'name' : String,
	'address' : String,
	'opening_hours' : String,
	'email' : String,
	'telephone' : String,
	'website' : String,
	'orders' : Array,
	'image_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'image'
	},
	'meals' : Array,
	'place_id' : String,
	'google_rating' : Number,
	'location' : {
		type: {
			type: String,
			enum: ['Point'],
			required: true
		},
		coordinates: {
			type: [Number],
			required: true
		}
	}
});

module.exports = mongoose.model('restaurant', restaurantSchema);
