import Character from '../models/characterModel.js';

export async function getRecruits() {
  const char = new Character({});
  const promise = char.save();

  Promise.all([promise, promise, promise])
    .then((chars) => {
      console.log(chars);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function buyRecruit() {
  return null;
}
