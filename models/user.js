const { body } = require('express-validator');

class Usuario {
    static validacoes() {
        return [
            body('nome').isLength({ min: 4 }).withMessage('O nome precisa ter no mínimo 4 caracteres!'),
            body('email').isEmail().withMessage('O campo de email está preenchido incorretamente!'),
            body('senha').isLength({ min: 1 }).withMessage('Campo Senha vazio!'),
            body('confirmar').isLength({ min: 1 }).withMessage('Campo Confirmar senha vazio!'),
        ]
    }
    static validacoesLogin() {
        return [
            body('email').isLength({min: 4}).withMessage('Email ou nome precisa ter no mínimo 4 caracteres!'),
            body('senha').isLength({ min: 1 }).withMessage('Campo Senha vazio!'),
        ]
    }
    static validacoesEditarPerfil() {
        return [
            body('nome').isLength({min: 4}).withMessage('O nome precisa ter no mínimo 4 caracteres!'),
            body('email').isLength({min: 4}).withMessage('Email ou nome precisa ter no mínimo 4 caracteres!'),
            body('senha').isLength({ min: 1 }).withMessage('Campo Senha vazio!'),
        ]
    }
}

module.exports = Usuario;
