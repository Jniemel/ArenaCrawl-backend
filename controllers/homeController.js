import GameState from '../models/gameStateModel.js';

export function greet(name) {
  console.log(`Greetings, ${name}`);
}

export async function getGameState(req, res) {
  const id = req.userId;
  const owner = req.username;
  if (!id || !owner) {
    return res.status(500);
  }
  let state = await GameState.findGameState(owner);
  if (!state) {
    state = new GameState({ owner });
    await state.initNewGame(state);
  }
  return res.status(200).json(state);
}
