/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import mongoose from 'mongoose';
import { teamSchema } from './teamModel.js';
import { characterSchema } from './characterModel.js';
import { recruitSchema } from './recruitModel.js';
import { generateName, randomNumber } from '../utils/rng.js';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const Team = mongoose.model('Team', teamSchema);
const Character = mongoose.model('Character', characterSchema);
const Recruit = mongoose.model('Recruit', recruitSchema);

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
  recruitment: {
    type: [recruitSchema],
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

gameStateSchema.methods.populateRecruitment = function () {
  const len = randomNumber(2, 6);
  for (let i = 0; i < len; i++) {
    const recruit = new Recruit({
      recruitee: new Character({ age: randomNumber(20, 32) }),
    });
    this.recruitment.push(recruit);
  }
  // console.log(this.recruitment);
};

gameStateSchema.post('save', (doc, next) => {
  console.log(`GameState saved.`);
  // console.log(`Initial gameState:\n${doc}`);
  next();
});

const gameStateModel = mongoose.model('GameState', gameStateSchema);

export default gameStateModel;
