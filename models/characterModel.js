/* eslint-disable func-names */
import mongoose from 'mongoose';

import {
  randomNumber,
  generateName,
  generateStats,
  generateSkills,
} from '../utils/rng.js';
import characterClasses from '../assets/game/characterClasses.json' assert { type: 'json' };
import { armorSchema, mWeaponSchema, rWeaponSchema } from './itemModels.js';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
  mWeapon: {
    type: mWeaponSchema,
    default: () => ({}),
  },
  rWeapon: {
    type: rWeaponSchema,
    default: () => ({}),
  },
  chest: {
    type: armorSchema,
    default: () => ({}),
  },
});

// eslint-disable-next-line import/prefer-default-export
export const characterSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  class: {
    type: String,
  },
  cssColor: {
    type: String,
  },
  stats: {
    type: Object,
  },
  skills: {
    type: Object,
  },
  equipment: {
    type: equipmentSchema,
    default: () => ({}),
  },
  age: {
    type: Number,
    default: randomNumber(20, 32),
  },
  maxHp: {
    type: Number,
  },
  maxMp: {
    type: Number,
  },
});

function getClassName() {
  const classNames = Object.keys(characterClasses);
  return classNames[randomNumber(0, classNames.length - 1)];
}

// initialize character
characterSchema.pre('save', async function (next) {
  if (!this.name) {
    const className = getClassName();
    this.name = generateName();
    this.class = className.charAt(0).toUpperCase() + className.slice(1);
    this.stats = generateStats(characterClasses[className].statWeights);
    this.skills = generateSkills(characterClasses[className].skillWeights);
    this.cssColor = characterClasses[className].classCssColor;
    this.maxHp = this.stats.constitution;
    this.maxMp = this.stats.intelligence;
  }
  next();
});
