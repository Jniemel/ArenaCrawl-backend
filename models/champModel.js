/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import mongoose from 'mongoose';
import { generateName } from '../utils/rng';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const champSchema = new Schema({
  name: {
    type: String,
    default: generateName(),
  },
  stats: {
    type: Object,
  },
});
