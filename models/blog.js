const mongoose = require('mongoose');
const blogModel = mongoose.Schema;
const BlogSchema = new blogModel({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	create: {
		type: Date,
		required: true,
	},
	profile: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model('BlogModels', BlogSchema);
