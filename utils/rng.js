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

// generate stats for a character according to given stat weight profile
export function generateStats(statProfile) {
  // check that the stat weights total 100
  if (!statProfile) {
    return null;
  }
  const checkTotal = Object.values(statProfile);
  if (checkTotal.reduce((prev, cur) => prev + cur, 0) !== 100 || !statProfile) {
    return null;
  }
  // sort the stat weights into array from high to low
  const profile = Object.entries(statProfile);
  const sorted = profile.sort((a, b) => b[1] - a[1]);
  // create tresholds to assign stat points according to
  const tresholds = [];
  let max = 100;
  sorted.forEach((stat) => {
    max -= stat[1];
    tresholds.push([max, stat[0]]);
  });
  // assign stats
  const totalStats = 70;
  let toInc;
  const stats = { str: 1, dex: 1, int: 1, con: 1, wil: 1 };
  for (let i = 0; i < totalStats; i++) {
    const num = randomNumber(0, 100);
    switch (true) {
      case num > tresholds[0][0]:
        toInc = tresholds[0][1];
        break;
      case num >= tresholds[1][0]:
        toInc = tresholds[1][1];
        break;
      case num >= tresholds[2][0]:
        toInc = tresholds[2][1];
        break;
      case num >= tresholds[3][0]:
        toInc = tresholds[3][1];
        break;
      default:
        toInc = tresholds[4][1];
        break;
    }
    // eslint-disable-next-line operator-assignment
    stats[toInc] = stats[toInc] + 1;
  }
  return {
    strenght: stats.str,
    dexterity: stats.dex,
    intelligence: stats.int,
    constitution: stats.con,
    willpower: stats.wil,
  };
}
