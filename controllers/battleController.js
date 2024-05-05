/* eslint-disable camelcase */
import mongoose from 'mongoose';
import { handleCatchErr, handleValErr } from '../utils/errorHandling.js';
import GameState from '../models/gameStateModel.js';
import { battleSchema } from '../models/battleModel.js';

const Battle = mongoose.model('Battle', battleSchema);

export async function start_get(req, res) {
  try {
    const state = await GameState.findOne({ owner: req.username });
    const playerTeam = state.playerTeam.champs;
    const npcTeam = state.npcTeams[0].champs;
    // #TODO
    // ADD LOGIC TO PICK ENEMY TEAM ACCORDING TO MATCH SCHEDULE
    // FOR NOW PICK FIRST ENEMY TEAM

    const battle = new Battle();
    playerTeam.forEach((champ) => battle.south.push(champ));
    npcTeam.forEach((champ) => battle.north.push(champ));
    console.log(battle);

    return res.status(200);
  } catch (err) {
    return handleCatchErr(res, err);
  }
}

export function placeholder() {
  return null;
}
