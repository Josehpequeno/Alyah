const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sha256 = require("crypto-js/sha256");

var MemoryStore = require('memorystore')(session);

const userDao = require('../dao/user-dao');
const db = require('./db');

module.exports = (app) => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {//done, função que precisa executar quando tiver feito a autenticação do usuário
            const userDao = new userDao(db);
            (userDao.busca(email)).then(user => {
                if (!user || sha256(password) != user.password) {
                    return done(null, false);
                }
                return done(null, user);
            }).catch(erro => {
                console.log(erro); //done(erro, false); 
            });
        }
    ));

    passport.serializeUser((user, done) => {// serelização do usuário, guarda em uma sessão as informações relevantes do usuário 
        const usersession = {
            id: user.id,
            nome: user.nome_de_user,
            email: user.email,
            eleicao: user.ultima_eleicao,
            descricao: user.descricao
        };
        done(null, usersession);
    });

    passport.deserializeUser((usersession, done) => {
        done(null, usersession);
    });

    app.set('trust proxy', 1);

    app.use(session({
        /*cookie: {
            secure: true,
            maxAge: 60000
        },
        store: new RedisStore({ client: redisClient }),*/
        cookie: { maxAge: 86400000 },
        store: new MemoryStore({
            checkPeriod: 86400000 // prune expired entries every 24h
        }),
        secret: 'Luxius_secret',
        genid: function (req) {
            return uuidv4();// para gerar string aleatórias, usada aqui para gerar o id das sessões
        },
        resave: false,// não salva a sessão sem alterações
        saveUninitialized: false // não cria sessões para todos que acessarem a pagina
    }));

    app.use(passport.initialize());
    app.use(passport.session());// iniciar o passaport e a sessão.

    app.use(function (req, resp, next) {
        req.passport = passport;
        req.session = true;
        //req.session = session.;
        next();//injeção de dependências
    });

}
