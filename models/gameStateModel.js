/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import mongoose from 'mongoose';
import { teamSchema } from './teamModel.js';
import { generateName } from '../utils/rng.js';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const Team = mongoose.model('Team', teamSchema);

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

gameStateSchema.methods.populateNpcTeams = function (numOfNpcs, numOfChamps) {
  for (let i = 0; i < numOfNpcs; i++) {
    const npc = new Team({ name: `Team ${generateName()}` });
    npc.populateTeam(numOfChamps);
    this.npcTeams.push(npc);
  }
};

gameStateSchema.post('save', (doc, next) => {
  console.log(`New gameState was created & saved.`);
  console.log(`Initial gameState:\n${doc}`);
  next();
});

const gameStateModel = mongoose.model('GameState', gameStateSchema);

export default gameStateModel;
