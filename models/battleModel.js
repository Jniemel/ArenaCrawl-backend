/* eslint-disable func-names */
import mongoose from 'mongoose';
import { teamSchema } from './teamModel.js';
import { characterSchema } from './characterModel.js';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const unitStateSchema = new Schema({
  character: {
    type: characterSchema,
  },
  player: {
    type: String,
  },
  team: {
    type: String,
  },
  hp: {
    type: Number,
  },
  mp: {
    type: Number,
  },
  x: {
    type: Number,
  },
  y: {
    type: Number,
  },
  played: {
    type: Boolean,
    default: false,
  },
});

// eslint-disable-next-line import/prefer-default-export
export const battleSchema = new Schema({
  status: {
    type: String,
    enum: ['inactive', 'init', 'active', 'finished'],
    default: 'inactive',
  },
  // team starting south
  teamSouth: {
    type: teamSchema,
  },
  southUnits: {
    type: [characterSchema],
  },
  // team starting north
  teamNorth: {
    type: teamSchema,
  },
  northUnits: {
    type: [characterSchema],
  },
  // battle log
  log: {
    type: [Object],
  },
  division: {
    type: Number,
    default: null,
  },
  winner: {
    type: String,
    default: 'undetermined',
  },
  unitStates: {
    type: [unitStateSchema],
  },
});
