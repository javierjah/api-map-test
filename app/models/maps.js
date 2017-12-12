const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapSchema = new Schema({
	id: Number,
	name: String,
	corsd: [{
		latitude: Number,
		longitude: Number
	}]
});

module.exports = mongoose.model('Maps', MapSchema);