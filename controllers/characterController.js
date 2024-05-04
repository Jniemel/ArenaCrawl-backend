/* eslint-disable camelcase */
import { validationResult } from 'express-validator';
import { handleCatchErr, handleValErr } from '../utils/errorHandling.js';
import GameState from '../models/gameStateModel.js';

export async function getRecruits() {
  return null;
}

export async function buy_post(req, res) {
  try {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
      return handleValErr(res, valErrors);
    }
    const state = await GameState.findOne({ owner: req.username });
    state.playerTeam.champs.push(req.body.char);
    state.save();

    return res.status(200); // .json({ user: user._id });
  } catch (err) {
    return handleCatchErr(res, err);
  }
}
