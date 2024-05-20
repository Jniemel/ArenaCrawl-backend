/* eslint-disable prefer-destructuring */
// generate random number between min (inclusive) and max (inclusive)
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate a "name"
export function generateName() {
  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  const lowercase = caps.map((letter) => letter.toLowerCase());
  // generate a random lenght for name
  const length = randomNumber(5, 12);
  let name = '';
  for (let i = 0; i < length; i++) {
    if (i === 0) {
      name = caps[randomNumber(0, caps.length - 1)];
    } else {
      name += lowercase[randomNumber(0, caps.length - 1)];
    }
  }
  return name;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// total points
const POINTS = 70;
// assing stats randomly with weights
export function generateStats(statProfile) {
  const statList = [];
  Object.entries(statProfile).forEach((stat) => {
    for (let i = 0; i < stat[1]; i++) {
      statList.push(stat[0]);
    }
  });
  shuffleArray(statList);
  const stats = {
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    willpower: 1,
  };
  for (let i = 0; i < POINTS; i++) {
    const statToIncrement = statList[randomNumber(0, statList.length - 1)];
    stats[statToIncrement] += 1;
  }
  return stats;
}
