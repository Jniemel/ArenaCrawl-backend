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
  body('char.name' /* 'validation failed: name' */)
    .trim()
    .isLength({ min: 5, max: 12 })
    .withMessage('here')
    .isString()
    .withMessage('here2')
    .isAlpha()
    .withMessage('here3')
    .escape(),
  body('char.age', 'validation failed: age')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('char.class', 'validation failed: class')
    .trim()
    .isLength({ min: 1, max: 25 })
    .isString()
    .isAlpha()
    .escape(),
  body('char.cssColor', 'validation failed: cssColor')
    .trim()
    .isLength({ min: 1, max: 25 })
    .isString()
    .isAlpha()
    .escape(),
  body('char.stats', 'validation failed: stats').isObject().trim().escape(),
];
