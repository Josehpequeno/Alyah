const { body } = require('express-validator');

class Usuario {
    static validacoes() {
        return [
            body('username').isLength({ min: 4 }).withMessage('The username must be at least 4 characters long!'),
            body('email').isEmail().withMessage('The email field is filled out incorrectly!'),
            body('password').isLength({ min: 1 }).withMessage('Empty password field!'),
            body('confirm-password').isLength({ min: 1 }).withMessage('Empty password confirmation field!'),
            body('confirm-password').custom((value, {req}) => value === req.body.password).withMessage("Password field and confirmation password do not match!")
        ]
    }
    static validacoesLogin() {
        return [
            body('email').isLength({ min: 4 }).withMessage('The email or username must be at least 4 characters long!'),
            body('password').isLength({ min: 1 }).withMessage('Empty password field!'),
        ]
    }
    static validacoesEditarPerfil() {
        return [
            body('username').isLength({ min: 4 }).withMessage('The username must be at least 4 characters long!'),
            body('email').isEmail().withMessage('The email field is filled out incorrectly!'),
            body('password').isLength({ min: 1 }).withMessage('Empty password field!'),
        ]
    }
}

module.exports = Usuario;
