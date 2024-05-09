/* eslint-disable camelcase */
import mongoose from 'mongoose';
import { handleCatchErr /* , handleValErr */ } from '../utils/errorHandling.js';
import GameState from '../models/gameStateModel.js';
import { battleSchema } from '../models/battleModel.js';

const Battle = mongoose.model('Battle', battleSchema);

export async function start_get(req, res) {
  try {
    const state = await GameState.findOne({ owner: req.username });
    if (state.battle.status === 'init') {
      const { playerTeam } = state;
      const npcTeam = state.npcTeams[0];
      // #TODO
      // ADD LOGIC TO PICK ENEMY TEAM ACCORDING TO MATCH SCHEDULE
      // FOR NOW PICK FIRST ENEMY TEAM
      const battle = new Battle({ status: 'init' });
      playerTeam.champs.forEach((champ) => battle.south.push(champ));
      npcTeam.champs.forEach((champ) => battle.north.push(champ));
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

export function placeholder() {
  return null;
}
