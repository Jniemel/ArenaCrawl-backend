/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import mongoose from 'mongoose';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const gameStateSchema = new Schema({
  owner: {
    type: String,
    required: true,
    unique: true,
  },
  playerTeam: {
    type: Array,
  },
  npcTeams: {
    type: Array,
  },
});

// find users gameState
gameStateSchema.statics.findGameState = async function (name) {
  const gameState = await this.findOne({ owner: name });
  if (gameState) {
    console.log('Found!');
    return gameState;
  }
  console.log('Not found!');
  return null;
};

// post save message
gameStateSchema.post('save', (doc, next) => {
  console.log(`New gameState was created & saved. Owner: ${doc.owner}`);
  next();
});

const gameStateModel = mongoose.model('GameState', gameStateSchema);

export default gameStateModel;
