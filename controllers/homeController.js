import GameState from '../models/gameStateModel.js';

export function greet(name) {
  console.log(`Greetings, ${name}`);
}

export async function getGameState(req, res) {
  const id = req.userId;
  const name = req.username;
  if (!id || !name) {
    return res.status(500);
  }
  let gameState = await GameState.findGameState(name);
  if (!gameState) {
    gameState = new GameState({ owner: name });
    gameState.playerTeam.populateTeam(6);
    gameState.populateNpcTeams(3, 6);
    gameState.populateRecruitment();
    gameState.save();
    return res.status(200).json(gameState);
  }
  return res.status(200).json(gameState);
}
