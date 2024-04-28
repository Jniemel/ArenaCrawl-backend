/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLenght: 6,
    maxLenght: 50,
  },
});

// salt and hash the password
userSchema.pre('save', async function (next) {
  const salt = await bcryptjs.genSalt();
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// post save message
userSchema.post('save', (doc, next) => {
  console.log(`New user was created & saved: ${doc.userName}(${doc._id})`);
  next();
});

// logging user in
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ userName: username });
  if (user) {
    const auth = await bcryptjs.compare(password, user.password);
    if (auth) {
      console.log(`User '${username}' logged in successfully.`);
      return user;
    }
    throw Error('Incorrent credentials');
  }
  throw Error('User does not exist');
};

const userModel = mongoose.model('User', userSchema);

export default userModel;
