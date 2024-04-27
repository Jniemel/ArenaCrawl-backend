import { body } from "express-validator";

export const validateSignUp = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be at leats 3 characters (max 20)")
    .escape(),
];

export const validateLogIn = [];
