const mongoose = require('mongoose');
const userModel = mongoose.Schema;
const UserSchema = new userModel({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model('UserModels', UserSchema);
