import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        minLenght: 3,
        maxLenght: 20
    },
    password: {
        type: String,
        required: true,
        minLenght: 6,
        maxLenght: 50
    }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;