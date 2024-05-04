/* eslint-disable func-names */
import mongoose from 'mongoose';
import { characterSchema } from './characterModel.js';
import { randomNumber } from '../utils/rng.js';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
// const Character = mongoose.model('Character', characterSchema);

// eslint-disable-next-line import/prefer-default-export
export const recruitSchema = new Schema({
  recruitee: {
    type: characterSchema,
  },
  price: {
    type: Number,
  },
});

function calcPrice(recruiteeAge) {
  // base price
  const base = 200;

  // age modifier
  const ageModifs = [
    -150, -120, -100, -80, -40, 0, 40, 70, 100, 130, 160, 180, 200,
  ];
  const seasonsLeft = 35 - recruiteeAge;
  const offset = seasonsLeft - 3;
  const age = ageModifs[offset];

  // random modifier
  const random = randomNumber(1, 10) * randomNumber(1, 10);

  // total
  return base + age + random;
}
/*
recruitSchema.methods.getRecruitee = function () {
  this.recruitee = new Character({ age: randomNumber(20, 32) });
};
*/
recruitSchema.pre('save', async function (next) {
  if (!this.price) {
    this.price = calcPrice(this.recruitee.age);
  }
  next();
});
