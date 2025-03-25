import { body, param, query } from 'express-validator';

export const validateCreateUser = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be a string')
        .isLength({ min: 1, max: 39 }).withMessage('Username must be between 1-39 characters')
        .matches(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i)
        .withMessage('Invalid GitHub username format'),
];

export const validateSearchUsers = [
    query('search')
        .optional()
        .trim()
        .isString().withMessage('Search term must be a string')
        .isLength({ min: 1 }).withMessage('Search term cannot be empty')
];

export const validateUsernameParam = [
    param('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be a string')
        .isLength({ min: 1, max: 39 }).withMessage('Username must be between 1-39 characters')
];


export const validateUpdateUser = [
    body("location")
        .optional()
        .trim()
        .isString().withMessage("Location must be a string")
        .isLength({ max: 100 }).withMessage("Location too long (max 100 chars)"),

    body("blog")
        .optional()
        .trim()
        .isURL().withMessage("Invalid blog URL format")
        .isLength({ max: 200 }).withMessage("Blog URL too long (max 200 chars)"),

    body("bio")
        .optional()
        .trim()
        .isString().withMessage("Bio must be a string")
        .isLength({ max: 300 }).withMessage("Bio too long (max 300 chars)")
];