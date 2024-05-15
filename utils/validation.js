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
    .isString()
    .isAlpha()
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

export const validateSaveGame = [
  body('unitStates', 'unitStates validation failed').isArray({
    min: 2,
    max: 12,
  }),
  body('unitStates.*', 'unitStateObject validation failed').isObject(),
  body('unitStates.*.character', 'character validation failed')
    .not()
    .isEmpty()
    .isObject(),
  // #TODO
  // add unitStates.*.character.stats and unitStates.*.character.stats.* validations
  // add unitStates.*.character.equipment and unitStates.*.character.equipment.* validations
  body('unitStates.*.player', 'player validation failed')
    .trim()
    .not()
    .isEmpty()
    .isString()
    .escape(),
  body('unitStates.*.team', 'team validation failed')
    .trim()
    .not()
    .isEmpty()
    .isString()
    .escape(),
  body('unitStates.*.hp', 'hp validation failed')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('unitStates.*.mp', 'mp validation failed')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('unitStates.*.x', 'x validation failed')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('unitStates.*.y', 'y validation failed')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('unitStates.*.played', 'played validation failed')
    .trim()
    .not()
    .isEmpty()
    .isBoolean()
    .escape(),
  body('logMsg', 'logMsg validation failed').isObject(),
  body('logMsg.*', 'logMsg.action validation failed')
    .trim()
    .not()
    .isEmpty()
    .escape(),
];

export const validateFinishGame = [
  body('unitStates', 'unitStates validation failed').isArray({
    min: 2,
    max: 12,
  }),
  body('unitStates.*', 'unitStateObject validation failed').isObject(),
  body('unitStates.*.character', 'character validation failed')
    .not()
    .isEmpty()
    .isObject(),
  // #TODO
  // add unitStates.*.character.stats and unitStates.*.character.stats.* validations
  // add unitStates.*.character.equipment and unitStates.*.character.equipment.* validations
  body('unitStates.*.player', 'player validation failed')
    .trim()
    .not()
    .isEmpty()
    .isString()
    .escape(),
  body('unitStates.*.team', 'team validation failed')
    .trim()
    .not()
    .isEmpty()
    .isString()
    .escape(),
  body('unitStates.*.hp', 'hp validation failed')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('unitStates.*.mp', 'mp validation failed')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('unitStates.*.x', 'x validation failed')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('unitStates.*.y', 'y validation failed')
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .escape(),
  body('unitStates.*.played', 'played validation failed')
    .trim()
    .not()
    .isEmpty()
    .isBoolean()
    .escape(),
  body('logMsg', 'logMsg validation failed')
    .optional({ values: 'falsy' })
    .isObject(),
  body('logMsg.*', 'logMsgField validation failed')
    .optional({ values: 'falsy' })
    .trim()
    .not()
    .isEmpty()
    .escape(),
  body('result', 'result validation failed')
    .trim()
    .not()
    .isEmpty()
    .isString()
    .escape(),
];
