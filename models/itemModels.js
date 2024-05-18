/* eslint-disable func-names */
import mongoose from 'mongoose';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

export const mWeaponSchema = new Schema({
  name: {
    type: String,
    default: 'fists',
  },
  type: {
    // always 'mWeapon'
    type: String,
    default: 'mWeapon',
    enum: ['mWeapon'],
  },
  subType: {
    type: String,
    enum: ['fists', 'swords', 'axes', 'daggers'],
    default: 'fists',
  },
  primaryStat: {
    type: String,
    enum: ['strenght', 'dexterity', 'Intelligence'],
    default: 'strenght',
  },
  dies: {
    type: Number,
    default: 1,
  },
  dieSides: {
    type: Number,
    default: 5,
  },
  sellPrice: {
    type: Number,
    default: 0,
  },
});

export const rWeaponSchema = new Schema({
  name: {
    type: String,
    default: 'empty',
  },
  type: {
    // always 'mWeapon'
    type: String,
    default: 'rWeapon',
    enum: ['rWeapon'],
  },
  subType: {
    type: String,
    enum: ['empty', 'bow', 'crossbow', 'thrown'],
    default: 'empty',
  },
  primaryStat: {
    type: String,
    enum: ['strenght', 'dexterity'],
    default: 'dexterity',
  },
  dies: {
    type: Number,
    default: 0,
  },
  dieSides: {
    type: Number,
    default: 0,
  },
  sellPrice: {
    type: Number,
    default: 0,
  },
});

export const armorSchema = new Schema({
  name: {
    type: String,
    default: 'shirt',
  },
  type: {
    // always 'armor'
    type: String,
    default: 'armor',
    enum: ['armor'],
  },
  subType: {
    type: String,
    // more slots in the future?
    enum: ['chest' /* , 'helmet', rings, necklace... */],
    default: 'chest',
  },
  AC: {
    type: Number,
    default: 0,
  },
  sellPrice: {
    type: Number,
    default: 0,
  },
});
