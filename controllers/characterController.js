/* eslint-disable camelcase */
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { handleCatchErr, handleValErr } from '../utils/errorHandling.js';
import GameState from '../models/gameStateModel.js';
import { characterSchema } from '../models/characterModel.js';

const Character = mongoose.model('Character', characterSchema);

export async function new_get(req, res) {
  try {
    const state = await GameState.findOne({ owner: req.username });
    await state.populateRecruitment();
    await state.save();
    return res.status(200).json({ state });
  } catch (err) {
    return handleCatchErr(res, err);
  }
}

export async function buy_post(req, res) {
  try {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
      return handleValErr(res, valErrors);
    }
    const { recruitee, price, _id } = req.body.recruit;
    // create new character according to the new recruit
    const character = new Character({
      name: recruitee.name,
      age: recruitee.age,
      class: recruitee.class,
      stats: recruitee.stats,
      cssColor: recruitee.cssColor,
    });
    // find gameState and push the new character into the team
    const state = await GameState.findOne({ owner: req.username });
    state.playerTeam.champs.push(character);
    // set new balance
    state.playerTeam.money -= price;
    // remove the recruited character from recruit pool
    state.recruitment.id(_id).deleteOne();
    await state.save();
    return res.status(200).json({ state });
  } catch (err) {
    return handleCatchErr(res, err);
  }
}
