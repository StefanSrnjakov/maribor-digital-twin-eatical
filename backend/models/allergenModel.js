const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const allergenSchema = new Schema({
	'title' : String,
	'image_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'image'
	}
});

module.exports = mongoose.model('allergen', allergenSchema);
