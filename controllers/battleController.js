/* eslint-disable camelcase */
import mongoose from 'mongoose';
import { handleCatchErr /* , handleValErr */ } from '../utils/errorHandling.js';
import GameState from '../models/gameStateModel.js';
import { battleSchema } from '../models/battleModel.js';
import { randomNumber } from '../utils/rng.js';

const Battle = mongoose.model('Battle', battleSchema);

// start battle or get active battle data
export async function start_get(req, res) {
  try {
    const state = await GameState.findOne({ owner: req.username });
    if (
      state.battle.status === 'inactive' ||
      state.battle.status === 'finished'
    ) {
      const { playerTeam } = state;
      // #TODO
      // ADD LOGIC TO PICK ENEMY TEAM ACCORDING TO MATCH SCHEDULE
      // FOR NOW PICK RANDOM
      const npcTeam =
        state.npcTeams[randomNumber(0, state.npcTeams.length - 1)];
      const battle = new Battle({ status: 'init' });
      battle.teamSouth = playerTeam;
      playerTeam.champs.forEach((champ) => battle.southUnits.push(champ));
      battle.teamNorth = npcTeam;
      npcTeam.champs.forEach((champ) => battle.northUnits.push(champ));
      battle.log.push({
        type: 'init',
        msg: `Battle initialized between ${playerTeam.name} and ${npcTeam.name}`,
      });
      state.battle = battle;
      await state.save();
    }
    return res.status(200).json(state.battle);
  } catch (err) {
    return handleCatchErr(res, err);
  }
}

// save battle
export async function save_post(req, res) {
  const { unitStates, logMsg } = req.body;
  const state = await GameState.findOne({ owner: req.username });
  if (state) {
    state.battle.unitStates = unitStates;
    state.battle.log.push(logMsg);
    if (state.battle.status === 'init') {
      state.battle.status = 'active';
    }
    await state.save();
    return res.status(200).end();
  }
  return res.status(500).end();
}

// finish battle
export async function finish_post(req, res) {
  const { unitStates, result, logMsg } = req.body;
  const state = await GameState.findOne({ owner: req.username });
  if (state) {
    state.battle.unitStates = unitStates;
    state.battle.status = 'finished';
    state.battle.winner =
      result === 'south'
        ? state.battle.teamSouth.name
        : state.battle.teamNorth.name;
    if (logMsg) {
      state.battle.log.push(logMsg);
    }
    await state.save();
    return res.status(200).end();
  }
  return res.status(500).end();
}
