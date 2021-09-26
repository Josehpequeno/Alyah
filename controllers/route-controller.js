const templates = '../views/';
const { validationResult } = require('express-validator');
const UserDAO = require('../dao/user-dao');
const db = require('../config/db');
const nodemailer = require('nodemailer');
require('dotenv/config');
class RouteController {
    static routes() {
        return {
            home: '/',
            login: '/login',
            signup: '/signup',
            signout: '/signout',
            mangas: '/mangas',
            manga: '/manga',
            populares: '/populares',
            profile: '/profile',
            editProfile: '/editprofile',
            changePassword: '/changepassword',
            mangaReader: '/mangaReader'
        }
    }
    home() {
        return (req, res) => {
            return res.render(templates + 'home.handlebars', { layout: false, title: 'Alyah' });
        }
    }
    login() {
        return (req, res) => {
            return res.render(templates + 'login.handlebars', { layout: false });
        }
    }
    makeLogin() {
        return (req, res, next) => {
            const err = validationResult(req);
            let userReq = req.body;
            if (!err.isEmpty()) {
                // console.log(err.errors);
                return res.render(templates + 'login.handlebars', { layout: false, error: err.errors[0].msg, user: userReq });
            } else {
                const passport = req.passport;
                //console.log(passport);
                passport.authenticate('local', (err, user, info) => {
                    if (info) {
                        console.log(info);
                        return res.render(templates + 'login.handlebars', { layout: false, user: userReq });
                    }
                    if (err) {
                        return next(err); // avança no processamento da requisição, passando um erro.
                    }
                    if (user) {
                        req.login(user, err => {
                            if (err) {
                                return next(err);
                            }
                            console.log(req.session.passport.user);
                            if (req.session.passport.user.favorites == null) {
                                return res.render(templates + 'profile.handlebars', { layout: false, user: user[0], favorites: 0 });
                            } else {
                                return res.render(templates + 'profile.handlebars', { layout: false, user: user, favorites: req.session.passport.user.favorites });
                            }
                        });
                    } else if (!user) {
                        const msg = "Login or password filled out incorrectly!";
                        return res.render(templates + 'login.handlebars', { layout: false, error: msg, user: userReq });
                    }
                })(req, res, next);
            }
        }
    }
    signup() {
        return (req, res) => {
            return res.render(templates + 'signup.handlebars', { layout: false });
        }
    }
    makeSignup() {
        return (req, res) => {
            const err = validationResult(req);
            let userReq = req.body;
            if (!err.isEmpty()) {
                // console.log(err.errors);
                return res.render(templates + 'signup.handlebars', { layout: false, error: err.errors[0].msg, user: userReq });
            }
            else {
                //console.log(userReq);
                const userDAO = new UserDAO(db);
                userDAO.searchEmail(userReq.email).then(user => {
                    console.log(user);
                    let msg = "This email is already being used!";
                    return res.render(templates + 'signup.handlebars', { layout: false, error: msg, user: userReq });
                }).catch(err => {
                    userDAO.searchName(userReq.name).then(user => {
                        let msg = "This username is already being used!";
                        return res.render(templates + 'signup.handlebars', { layout: false, error: msg, user: userReq });
                    }).catch(err => {
                        // let chars = "9ABC0DEF1GHI2JKL3MNO4PQR5STU6VWX7YZ8";
                        // let randomstring = "";
                        // for (let i = 0; i <= 5; i++) {
                        //     let j = Math.floor(Math.random() * chars.length);
                        //     randomstring += chars[j];
                        // }
                        // let tranporter = nodemailer.createTransport({
                        //     service: 'gmail',
                        //     auth: {
                        //         user: process.env.email,
                        //         pass: process.env.password
                        //     }
                        // });
                        // let mailOptions = {
                        //     from: process.env.email,
                        //     to: userReq.email,
                        //     subject: 'security code from Alyah',
                        //     text: randomstring,
                        //     html: `<h1>Welcome to Alyah</h1>
                        //     <h2>${randomstring}</h2>
                        //     <p>That was easy!</p>
                        //     <small>if you have not registered with Alyah, just ignore this email.</small>`
                        // }
                        // tranporter.sendMail(mailOptions, (err, info) => {
                        //     if (err) {
                        //         console.log(err);
                        //     } else {
                        //         console.log("Email sent: " + info.response);
                        //     }
                        // })
                        // // cadastrar o email vazio e depois excluir
                        userDAO.createUser(userReq.name, userReq.email, userReq.password).then(user => {
                            // console.log("user: " + JSON.stringify(user));
                            return res.render(templates + 'profile.handlebars', { layout: false, user: user, favorites: 0 });
                        }).catch(err => {
                            return res.render(templates + 'signup.handlebars', { layout: false, error: err, user: userReq });
                        });
                    });
                });
            }
        }
    }
    signout() {
        return (req, res) => {
            req.logout();
            return res.render(templates + 'home.handlebars', { layout: false, title: 'Alyah' });
        }
    }
    mangas() {
        return (req, res) => {
            return res.render(templates + 'mangas.handlebars', { layout: false });
        }
    }
    manga() {
        return (req, res) => {
            return res.render(templates + 'manga.handlebars', { layout: false });
        }
    }
    populares() {
        return (req, res) => {
            return res.render(templates + 'populares.handlebars', { layout: false });
        }
    }
    profile() {
        return (req, res) => {
            return res.render(templates + 'profile.handlebars', { layout: false });
        }
    }
    editProfile() {
        return (req, res) => {
            return res.render(templates + 'editProfile.handlebars', { layout: false });
        }
    }
    changePassword() {
        return (req, res) => {
            return res.render(templates + 'changePassword.handlebars', { layout: false });
        }
    }
    mangaReader() {
        return (req, res) => {
            let items = [
                { url: 'static/images/manga-static/manga1.jpg' },
                { url: 'static/images/manga-static/manga2.jpeg' },
                { url: 'static/images/manga-static/manga3.jpeg' },
                { url: 'static/images/manga-static/manga4.jpeg' },
                { url: 'static/images/manga-static/manga5.jpeg' },
                { url: 'static/images/manga-static/manga6.jpg' },
                { url: 'static/images/manga-static/manga7v3.jpeg' },
                { url: 'static/images/manga-static/manga8.jpg' },
                { url: 'static/images/manga-static/manga9.jpeg' },
                { url: 'static/images/manga-static/manga10.png' }
            ];
            const pages = [...Array(items.length + 1).keys()];
            let opt = '';
            pages.map(function (item) {
                if (item != 0) {
                    opt += `<option value="${item - 1}"> Page ${item} </<option>`;
                }
            });
            let images = '';
            let i = 0;
            items.map(function (item) {
                if (images === '') {
                    images += `<img alt="manga" src="${item.url}" id="page_${i}" />`;
                }
                images += `<img alt="manga" src="${item.url}" class="hidden" id="page_${i}" />`;
                i++;
            });
            return res.render(templates + 'mangaReader.handlebars', { layout: false, items: items, options: opt, images: images, length: i });
        }
    }
}
module.exports = RouteController;
