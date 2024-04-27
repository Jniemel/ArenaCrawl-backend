import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
	userName: {
		type: String,
		required: true,
		minLenght: 3,
		maxLenght: 20,
	},
	password: {
		type: String,
		required: true,
		minLenght: 6,
		maxLenght: 50,
	},
});

userSchema.post('save', function (doc, next) {
	console.log('New user was saved', doc);
	next();
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
