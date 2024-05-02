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
      name = caps[randomNumber(0, caps.length)];
    } else {
      name += lowercase[randomNumber(0, caps.length)];
    }
  }
  return name;
}

// generate stats for a character according to given stat weight profile
export function generateStats(statProfile) {
  // check that the stat weights total 100
  const checkTotal = Object.values(statProfile);
  if (checkTotal.reduce((prev, cur) => prev + cur, 0) !== 100) {
    return null;
  }
  // sort the stat weights into array from high to low
  const profile = Object.entries(statProfile);
  const sorted = profile.sort((a, b) => b[1] - a[1]);
  // create weighted tresholds to assign stat points according to
  let tresholds = [];
  let max = 100;
  sorted.forEach((stat) => {
    max -= stat[1];
    tresholds.push([max, stat[0]]);
  });
  console.log(tresholds);
  // assign stats
  const totalStats = 70;
  const stats = { str: 1, dex: 1, int: 1, con: 1, wil: 1 };
  for (let i = 0; i < totalStats; i++) {
    const num = randomNumber(0, 100);
    switch (num) {
      case num >= tresholds[0][0]:
        break;
      case num >= tresholds[1][0]:
        break;
      case num >= tresholds[2][0]:
        break;
      case num >= tresholds[3][0]:
        break;
      default:
        break;
    }
  }
  /*
  return {
    strenght: str,
    dexterity: dex,
    intelligence: int,
    constitution: con,
    willpower: wil,
  };
	*/
  return null;
}

generateStats({ str: 20, dex: 25, int: 30, con: 10, wil: 15 });
