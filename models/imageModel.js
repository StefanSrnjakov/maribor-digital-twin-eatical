var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var imageSchema = new Schema({
	'name' : String,
	'description' : String,
	'path' : String
});

module.exports = mongoose.model('image', imageSchema);
