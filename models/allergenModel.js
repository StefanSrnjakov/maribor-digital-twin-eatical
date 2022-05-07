var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var allergenSchema = new Schema({
	'title' : String,
	'image_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'image'
	}
});

module.exports = mongoose.model('allergen', allergenSchema);
