const { body } = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
    body('email')
    .isEmail().withMessage('Enter the correct email')
    .custom(async (value, req) => {
        try {
            const user = await User.findOne({ email: value })
            if (user) {
                return Promise.reject('This email is already registered')
            }
        } catch(e) {
            console.log(e)
        }
    })
    .normalizeEmail(),
    body('password', 'Password should be alphanumeric type with 6 to 56 symbols length')
    .isLength({min: 6, max: 56})
    .isAlphanumeric()
    .trim(),
    body('confirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords should be the same')
        }
        return true
    })
    .trim(),
    body('name')
    .isLength({min: 1})
    .withMessage ('Name shoul consist minimum of 1 symbol')
    .trim()
]

exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Minimal length of the title is 3 symbols').trim(),
    body('price').isNumeric().withMessage('Enter correct price'),
    body('img', 'Enter the correct URL of the image').isURL()
]