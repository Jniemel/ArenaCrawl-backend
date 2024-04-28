/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
import 'dotenv/config';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// jsonwebtoken
const tokenMaxAge = 24 * 60 * 60; // 1 day
const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: tokenMaxAge,
  });

// handle validation errors
const handleValErr = (res, errs) => {
  const arr = errs.array();
  console.error(arr);
  return res.status(422).json({ errors: arr });
};

// handle catch errors
const handleCatchErr = (res, err) => {
  console.error(err.message, err.code);
  return res.status(400).json({ errors: err });
};

export const signUp_post = async (req, res) => {
  try {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
      return handleValErr(res, valErrors);
    }
    const user = await User.create({
      userName: req.body.username,
      password: req.body.password,
    });
    const token = createToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      tokenMaxAge: tokenMaxAge * 1000,
    });
    return res.status(200).send({ user: user._id });
  } catch (err) {
    handleCatchErr(res, err);
  }
};

export async function logIn_post(req, res) {
  console.log(req.body);
  return null;
}
