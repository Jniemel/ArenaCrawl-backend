import {
  randomNumber,
  generateName,
  generateStats,
  generateSkills,
} from '../utils/rng.js';

describe('random number generation', () => {
  test('get random number', () => {
    expect(randomNumber(0, 0)).toBe(0);
    expect(randomNumber(0, 1)).toBeGreaterThanOrEqual(0);
    expect(randomNumber(0, 1)).toBeLessThan(2);
    expect(randomNumber(5, 78)).toBeGreaterThanOrEqual(5);
    expect(randomNumber(5, 78)).toBeLessThan(79);
  });
});

describe('random name generation', () => {
  test('get random name', () => {
    const name = generateName();
    console.log(name);
    const lowercases = name.slice(1, -1);
    expect(name.charAt(0)).toMatch(/[A-Z]/);
    expect(name.charAt(0)).not.toMatch(/[a-z]/);
    expect(lowercases).toMatch(/[a-z]/);
    expect(lowercases).not.toMatch(/[A-Z]/);
    expect(name.length).toBeGreaterThanOrEqual(5);
    expect(name.length).toBeLessThan(13);
  });
});

describe('generate stats', () => {
  test('get random stats', () => {
    const statWeights = {
      strength: 3,
      dexterity: 3,
      intelligence: 1,
      constitution: 2,
      willpower: 1,
    };
    expect(
      Object.values(generateStats(statWeights)).reduce(
        (pre, cur) => pre + cur,
        0,
      ),
    ).toBe(75);
  });
});

describe('generate skill', () => {
  test('get random skills', () => {
    const skillWeights = {
      swords: 6,
      axes: 3,
      daggers: 2,
      bows: 1,
      crossbows: 1,
      thrown: 3,
      destruction: 1,
      healing: 1,
      protection: 1,
      enhancement: 1,
    };
    console.log(generateSkills(skillWeights));
    expect(
      Object.values(generateSkills(skillWeights)).reduce(
        (pre, cur) => pre + cur,
        0,
      ),
    ).toBe(200);
  });
});
