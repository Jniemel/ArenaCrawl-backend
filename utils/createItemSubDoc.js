import mongoose from 'mongoose';

import {
  mWeaponSchema,
  rWeaponSchema,
  armorSchema,
} from '../models/itemModels.js';

const MWeapon = mongoose.model('MWeapon', mWeaponSchema);
const RWeapon = mongoose.model('RWeaponr', rWeaponSchema);
const Armor = mongoose.model('Armor', armorSchema);

export default function createItemSubDoc(slot, item, subType) {
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
    subDoc = new RWeapon({
      name: item.name,
      subType,
      primaryStat: item.primary,
      dies: item.dies,
      dieSides: item.sides,
      sellPrice: item.price / 2,
    });
  } else {
    subDoc = new Armor({
      name: item.name,
      subType,
      AC: item.AC,
      sellPrice: item.price / 2,
    });
  }
  return subDoc;
}
