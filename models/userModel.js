import mongoose from "mongoose";

// eslint-disable-next-line prefer-destructuring
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

userSchema.post("save", (doc, next) => {
  console.log("New user was saved", doc);
  next();
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
