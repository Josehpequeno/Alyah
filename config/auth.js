const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sha256 = require("crypto-js/sha256");

var MemoryStore = require('memorystore')(session);

const UserDao = require('../dao/user-dao');
const FavoriteDao = require('../dao/favorite-dao');
const db = require('./db');

module.exports = (app) => {

    let favorites = null;
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {//done, função que precisa executar quando tiver feito a autenticação do usuário
            const userDao = new UserDao(db);
            (userDao.search(email)).then(user => {
                if (!user || sha256(password) != user[0].password) {
                    return done(null, false);
                }
                if (user.favorites_id != null) {
                    let favoriteDao = new FavoriteDao(db);
                    favoriteDao.search(user.favorites_id).then(favorites_array =>{
                        console.log(favorites_array);
                        favorites =  favorites_array.length;
                    }).catch(err => {
                        console.log(err);
                    });
                }
                return done(null, user);
            }).catch(err => {
                console.log(err); 
                return done(err, false);
            });
        }
    ));
    passport.serializeUser((user, done) => {// serelização do usuário, guarda em uma sessão as informações relevantes do usuário 
        const usersession = {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
            favorites_id: user[0].favorites_id,
            favorites: favorites,
            description: user[0].description,
            profile: user[0].profile
        };
        done(null, usersession);
    });

    passport.deserializeUser((usersession, done) => {
        done(null, usersession);
    });

    app.set('trust proxy', 1);

    app.use(session({
        cookie: { maxAge: 86400000 },
        store: new MemoryStore({
            checkPeriod: 86400000 // prune expired entries every 24h
        }),
        secret: 'Alyahsecret',
        genid: function (req) {
            return uuidv4();// para gerar string aleatórias, usada aqui para gerar o id das sessões
        },
        resave: false,// não salva a sessão sem alterações
        saveUninitialized: false // não cria sessões para todos que acessarem a pagina
    }));

    app.use(passport.initialize());
    app.use(passport.session());// iniciar o passaport e a sessão.

    app.use((req, resp, next) => {
        req.passport = passport;
        next();//injeção de dependências
    });
}
