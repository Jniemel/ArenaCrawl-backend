/* eslint-disable func-names */
import mongoose from 'mongoose';
import { characterSchema } from './characterModel.js';
import { randomNumber } from '../utils/rng.js';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const Character = mongoose.model('Character', characterSchema);

export const teamSchema = new Schema({
  name: {
    type: String,
    default: 'Brawl inc.',
  },
  money: {
    type: Number,
    default: 1000,
  },
  champs: {
    type: [characterSchema],
  },
});

teamSchema.methods.populateTeam = function (num) {
  for (let i = 0; i < num; i++) {
    const char = new Character({ age: randomNumber(20, 32) });
    this.champs.push(char);
  }
};

export const TeamModel = mongoose.model('Team', teamSchema);
