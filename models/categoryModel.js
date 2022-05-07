var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var categorySchema = new Schema({
	'title' : String,
	'image_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'image'
	}
});

module.exports = mongoose.model('category', categorySchema);
