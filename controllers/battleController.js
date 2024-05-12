/* eslint-disable camelcase */
import mongoose from 'mongoose';
import { handleCatchErr /* , handleValErr */ } from '../utils/errorHandling.js';
import GameState from '../models/gameStateModel.js';
import { battleSchema } from '../models/battleModel.js';
import { randomNumber } from '../utils/rng.js';

const Battle = mongoose.model('Battle', battleSchema);

// start battle
export async function start_get(req, res) {
  try {
    const state = await GameState.findOne({ owner: req.username });
    if (state.battle.status === 'inactive') {
      const { playerTeam } = state;
      // #TODO
      // ADD LOGIC TO PICK ENEMY TEAM ACCORDING TO MATCH SCHEDULE
      // FOR NOW PICK RANDOM
      const npcTeam =
        state.npcTeams[randomNumber(0, state.npcTeams.length - 1)];
      const battle = new Battle({ status: 'init' });
      battle.southId = playerTeam._id;
      playerTeam.champs.forEach((champ) => battle.southUnits.push(champ));
      battle.northId = npcTeam._id;
      npcTeam.champs.forEach((champ) => battle.northUnits.push(champ));
      battle.log.push(
        `Battle initialized between ${playerTeam.name} and ${npcTeam.name}`,
      );
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
  const { unitStates } = req.body;
  const state = await GameState.findOne({ owner: req.username });
  if (state) {
    state.battle.unitStates = unitStates;
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
  const { unitStates, result } = req.body;
  const state = await GameState.findOne({ owner: req.username });
  if (state) {
    state.battle.unitStates = unitStates;
    state.battle.status = 'finished';
    state.battle.winner = result;
    await state.save();
    return res.status(200).end();
  }
  return res.status(500).end();
}
