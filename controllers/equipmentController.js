/* eslint-disable camelcase */
import GameState from '../models/gameStateModel.js';
import createItemSubDoc from '../utils/createItemSubDoc.js';
import weapons from '../assets/game/weapons.json' assert { type: 'json' };
import armory from '../assets/game/armory.json' assert { type: 'json' };
import spells from '../assets/game/spells.json' assert { type: 'json' };

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
  const { buyReq } = req.body;
  let reject = false;
  let msg = '';
  let item = null;
  let newState = null;
  // check items properties from client match with the properties on server
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
        state.playerTeam.money + champ.equipment[buyReq.slot].sellPrice <
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
        await state.save();
        newState = state;
      }
    }
    return res.status(200).json({ reject, msg, newState });
  }
  return res.status(500).end();
}
