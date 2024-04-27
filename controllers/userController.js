import { validationResult } from "express-validator";
import User from "../models/userModel";

export const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const user = new User({
    userName: req.body.username,
    password: req.body.password,
  });
  // await user.save();
  return res.status(200).send({ msg: "User created", newUser: user.userName });
};

export async function logIn(req, res) {
  console.log(req.body);
}
