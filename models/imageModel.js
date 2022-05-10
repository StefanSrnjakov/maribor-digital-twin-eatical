const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const imageSchema = new Schema({
	'name' : String,
	'description' : String,
	'path' : String
});

module.exports = mongoose.model('image', imageSchema);
