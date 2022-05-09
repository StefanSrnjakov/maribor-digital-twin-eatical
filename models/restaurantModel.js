var mongoose = require('mongoose');
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
	'orders' : [{type: Schema.Types.ObjectId, ref: 'order'}],
	'image_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'image'
	},
	'meals' : [{type: Schema.Types.ObjectId, ref: 'meal'}],
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
	},
	'ratings' : [{type: Number}]
});

module.exports = mongoose.model('restaurant', restaurantSchema);
