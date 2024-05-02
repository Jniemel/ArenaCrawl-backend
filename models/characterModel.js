/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import mongoose from 'mongoose';
import { randomNumber, generateName, generateStats } from '../utils/rng.js';
import characterClasses from '../assets/game/characterClasses.json' assert { type: 'json' };

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const characterSchema = new Schema({
  name: {
    type: String,
    default: generateName(),
  },
  class: {
    type: String,
  },
  stats: {
    type: Object,
  },
});

function getClassName() {
  const classNames = Object.keys(characterClasses);
  return classNames[randomNumber(0, classNames.length - 1)];
}

// create character
characterSchema.pre('save', async function (next) {
  const className = getClassName();
  this.class = className.charAt(0).toUpperCase() + className.slice(1);
  this.stats = generateStats(characterClasses[className].statWeights);
  next();
});

const characterModel = mongoose.model('Character', characterSchema);

export default characterModel;
