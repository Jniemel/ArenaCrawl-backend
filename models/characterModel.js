/* eslint-disable func-names */
import mongoose from 'mongoose';
import { randomNumber, generateName, generateStats } from '../utils/rng.js';
import characterClasses from '../assets/game/characterClasses.json' assert { type: 'json' };

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

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
  age: {
    type: Number,
    default: randomNumber(20, 32),
  },
});

function getClassName() {
  const classNames = Object.keys(characterClasses);
  return classNames[randomNumber(0, classNames.length - 1)];
}

// set character class and stats
characterSchema.pre('save', async function (next) {
  if (!this.name) {
    const className = getClassName();
    this.name = generateName();
    this.class = className.charAt(0).toUpperCase() + className.slice(1);
    this.stats = generateStats(characterClasses[className].statWeights);
    this.cssColor = characterClasses[className].classCssColor;
  }
  next();
});
