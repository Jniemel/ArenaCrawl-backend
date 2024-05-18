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

function createItemSubDoc(slot, item, subType) {
  let subDoc = {};
  if (slot === 'mWeapon') {
    subDoc = new MWeapon({
      name: item.name,
      subType,
      primaryStat: item.primary,
      dies: item.dies,
      dieSides: item.sides,
      sellPrice: item.price / 2,
    });
  } else if (slot === 'rWeapon') {
    //
  }
  return subDoc;
}

export async function buy_post(req, res) {
  // #TODO add validation
  /*
  const valErrors = validationResult(req);
  if (!valErrors.isEmpty()) {
    return handleValErr(res, valErrors);
  }
	*/
  const { buyReq } = req.body;
  // console.log(buyReq);
  let reject = false;
  let msg = '';
  let item = null;
  // check items properties from client match with the propoerties on server
  if (buyReq.shop === 'weapons') {
    item = weapons[buyReq.type].find((e) => e.name === buyReq.item.name);
  } else if (buyReq.shop === 'armory') {
    item = armory[buyReq.type].find((e) => e.name === buyReq.item.name);
  } else if (buyReq.shop === 'spells') {
    item = spells[buyReq.type].find((e) => e.name === buyReq.item.name);
  }
  if (!(JSON.stringify(item) === JSON.stringify(buyReq.item)) || !item) {
    reject = true;
    msg = 'Item properties did not match or item was not found';
  }
  const state = await GameState.findOne({ owner: req.username });
  if (state) {
    if (!reject) {
      const champ = state.playerTeam.champs.id(buyReq.targetId);
      if (
        buyReq.shop !== 'spells' &&
        state.playerTeam.money + champ.equipment[buyReq.slot] <
          buyReq.item.price
      ) {
        msg = 'Insufficient funds';
        reject = true;
      }
      // #TODO if buying spell, check spells slots are not full
      /* else if (buyReq.shop === 'spells') {...} */
      if (!reject) {
        champ.equipment[buyReq.slot] = createItemSubDoc(
          buyReq.slot,
          buyReq.item,
          buyReq.type,
        );
        msg = 'ok';
      }
      await state.save();
    }
    return res.status(200).json({ reject, msg });
  }
  return res.status(500).end();
}
