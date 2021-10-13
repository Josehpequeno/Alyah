const { body } = require('express-validator');

class Usuario {
    static validations() {
        return [
            body('name').isLength({ min: 4 }).withMessage('The username must be at least 4 characters long!'),
            body('email').isEmail().withMessage('The email field is filled out incorrectly!'),
            body('password').isLength({ min: 1 }).withMessage('Empty password field!'),
            body('confirm-password').isLength({ min: 1 }).withMessage('Empty password confirmation field!'),
            body('confirm-password').custom((value, {req}) => value === req.body.password).withMessage("Password field and confirmation password do not match!")
        ]
    }
    static validationsLogin() {
        return [
            body('email').isLength({ min: 4 }).withMessage('The email or username must be at least 4 characters long!'),
            body('password').isLength({ min: 1 }).withMessage('Empty password field!'),
        ]
    }
    static validationsEditProfile() {
        return [
            body('name').isLength({ min: 4 }).withMessage('The username must be at least 4 characters long!'),
            body('email').isEmail().withMessage('The email field is filled out incorrectly!')
        ]
    }
    static validationsChangePassword() {
        return [
            body('current-password').isLength({ min: 1 }).withMessage('Empty password field!'),
            body('password').isLength({ min: 1 }).withMessage('Empty password field!'),
            body('confirm-password').isLength({ min: 1 }).withMessage('Empty password confirmation field!'),
            body('confirm-password').custom((value, {req}) => value === req.body.password).withMessage("Password field and confirmation password do not match!"),
            body('current-password').custom((value, {req}) => value !== req.body.password).withMessage("New password equals current password!") 
        ]
    }
}

module.exports = Usuario;
