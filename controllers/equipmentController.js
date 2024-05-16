/* eslint-disable camelcase */
import mongoose from 'mongoose';
import GameState from '../models/gameStateModel.js';
import {
  mWeaponSchema,
  rWeaponSchema,
  armorSchema,
} from '../models/itemModels.js';
import weapons from '../assets/game/weapons.json' assert { type: 'json' };
import armory from '../assets/game/armory.json' assert { type: 'json' };
import spells from '../assets/game/spells.json' assert { type: 'json' };

const MWeapon = mongoose.model('MWeapon', mWeaponSchema);
const RWeapon = mongoose.model('RWeaponr', rWeaponSchema);
const Armor = mongoose.model('Armor', armorSchema);

export async function inventory_get(req, res) {
  const shopInvetory = { weapons, armory, spells };
  return res.status(200).json(shopInvetory);
}

export async function buy_post(req, res) {
  // #TODO add validation
  /*
  const valErrors = validationResult(req);
  if (!valErrors.isEmpty()) {
    return handleValErr(res, valErrors);
  }
	*/
  const { item } = req.body;
  const state = await GameState.findOne({ owner: req.username });
  if (state) {
    // await state.save();
    return res.status(200).end();
  }
  return res.status(500).end();
}
