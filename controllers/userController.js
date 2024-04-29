/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
import 'dotenv/config';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// jsonwebtoken
const tokenMaxAge = 24 * 60 * 60; // 1 day
const createToken = (id, username) =>
  jwt.sign({ id, username }, process.env.JWT_SECRET, {
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
    const token = createToken(user._id, user.userName);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      tokenMaxAge: tokenMaxAge * 1000,
    });
    return res.status(200).send({ user: user._id });
  } catch (err) {
    return handleCatchErr(res, err);
  }
};

export async function logIn_post(req, res) {
  try {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
      return handleValErr(res, valErrors);
    }
    const user = await User.login(req.body.username, req.body.password);
    const token = createToken(user._id, user.userName);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      tokenMaxAge: tokenMaxAge * 1000,
    });
    return res.status(200).json({ user: user._id });
  } catch (err) {
    return handleCatchErr(res, err);
  }
}

export async function logOut_post() {
  return null;
}
