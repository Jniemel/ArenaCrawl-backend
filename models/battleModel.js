/* eslint-disable func-names */
import mongoose from 'mongoose';
import { characterSchema } from './characterModel.js';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

// eslint-disable-next-line import/prefer-default-export
export const battleSchema = new Schema({
  status: {
    type: String,
    enum: ['inactive', 'init', 'active', 'finished'],
    default: 'init',
  },
  // team starting south
  south: {
    type: [characterSchema],
  },
  // team starting north
  north: {
    type: [characterSchema],
  },
  log: {
    type: [String],
  },
  division: {
    type: Number,
    default: null,
  },
  winner: {
    type: String,
    enum: ['south', 'north'],
  },
});
