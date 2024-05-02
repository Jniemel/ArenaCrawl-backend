import { randomNumber, generateName } from '../utils/rng.js';

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
    const lowercases = name.slice(1, -1);
    expect(name.charAt(0)).toMatch(/[A-Z]/);
    expect(name.charAt(0)).not.toMatch(/[a-z]/);
    expect(lowercases).toMatch(/[a-z]/);
    expect(lowercases).not.toMatch(/[A-Z]/);
    expect(name.length).toBeGreaterThanOrEqual(5);
    expect(name.length).toBeLessThan(13);
  });
});
