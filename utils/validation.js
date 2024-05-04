import { body } from 'express-validator';

export const validateSignUp = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Name must be at leats 3 characters (max 20)')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Username can only have letters & numbers')
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 6, max: 50 })
    .withMessage('Password must be at leats 6 characters (max 50)')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]+$/,
    )
    .withMessage(
      'Password must contain at least one uppercase character, one lowercase character, one number and one special character (!@#$%^&*)',
    )
    .escape(),
];

export const validateLogIn = [
  body('username')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Please enter username')
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Please enter password')
    .escape(),
];

export const validateChamp = [
  body('recruit.recruitee.name', 'validation failed: name')
    .trim()
    .isLength({ min: 5, max: 12 })
    .withMessage('here')
    .isString()
    .withMessage('here2')
    .isAlpha()
    .withMessage('here3')
    .escape(),
  body('recruit.recruitee.age', 'validation failed: age')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('recruit.recruitee.class', 'validation failed: class')
    .trim()
    .isLength({ min: 1, max: 25 })
    .isString()
    .isAlpha()
    .escape(),
  body('recruit.recruitee.cssColor', 'validation failed: cssColor')
    .trim()
    .isLength({ min: 1, max: 25 })
    .isString()
    .isAlpha()
    .escape(),
  body('recruit.recruitee.stats', 'validation failed: stats').isObject(),
  body('recruit.recruitee.stats.strenght', 'validation failed: strenght')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('recruit.recruitee.stats.strenght', 'validation failed: strenght')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('recruit.recruitee.stats.dexterity', 'validation failed: dexterity')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body(
    'recruit.recruitee.stats.constitution',
    'validation failed: constitution',
  )
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body(
    'recruit.recruitee.stats.intelligence',
    'validation failed: intelligence',
  )
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('recruit.recruitee.stats.willpower', 'validation failed: willpower')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('recruit.price', 'validation failed: price')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
];
