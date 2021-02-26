const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema for User
const UserSchema = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		}, 
		mbti: {
			type: String,
		}

	},
	{ timestamps: true }
);

// create model for user

const User = mongoose.model("User", UserSchema);

module.exports = User;
