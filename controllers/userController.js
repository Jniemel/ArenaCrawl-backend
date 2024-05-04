/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
import 'dotenv/config';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { handleCatchErr, handleValErr } from '../utils/errorHandling.js';
import User from '../models/userModel.js';

// jsonwebtoken
const tokenMaxAge = 24 * 60 * 60; // 1 day
const createToken = (id, username) =>
  jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: tokenMaxAge,
  });

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
      MaxAge: tokenMaxAge * 1000,
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
      MaxAge: tokenMaxAge * 1000,
    });
    return res.status(200).json({ user: user._id });
  } catch (err) {
    return handleCatchErr(res, err);
  }
}

export function logOut_get(req, res) {
  res.cookie('jwt', '', { maxAge: 1 });
  res.end();
}
