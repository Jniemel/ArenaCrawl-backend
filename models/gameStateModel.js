/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import mongoose from 'mongoose';
// import { randomNumber, generateName, generateStats } from '../utils/rng.js';
import { teamSchema } from './teamModel.js';
// import characterClasses from '../assets/game/characterClasses.json' assert { type: 'json' };

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

/*
const teamSchema = new Schema({
  name: {
    type: String,
    default: 'Brawl inc.',
  },
  champs: {
    type: Array,
    default: [],
  },
});
*/

const gameStateSchema = new Schema({
  owner: {
    type: String,
    required: true,
    unique: true,
  },
  playerTeam: {
    type: teamSchema,
    default: () => ({}),
  },
  npcTeams: {
    type: [teamSchema],
    default: [],
  },
});

// find users gameState
gameStateSchema.statics.findGameState = async function (name) {
  const gameState = await this.findOne({ owner: name });
  if (gameState) {
    console.log('Game found!');
    return gameState;
  }
  console.log('No game found!');
  return null;
};

gameStateSchema.post('save', (doc, next) => {
  console.log(`New gameState was created & saved.`);
  console.log(`Initial gameState:\n${doc}`);
  next();
});

const gameStateModel = mongoose.model('GameState', gameStateSchema);

export default gameStateModel;
