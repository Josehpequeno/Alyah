const templates = '../views/';
const { validationResult } = require('express-validator');
const UserDAO = require('../dao/user-dao');
const MangaDao = require('../dao/manga-dao');
const AuthorDao = require('../dao/author-dao');
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
            mangaReader: '/mangaReader',
            addImage: '/AddImages'
        }
    }
    home() {
        return (req, res) => {
            let mangaDao = new MangaDao(db);
            mangaDao.getAllMangas().then(results => {
                // ?:TODO: [] alterar banco de dados add urls das capas de cada mangá.
                return res.render(templates + 'home.handlebars', { layout: false, title: 'Alyah', mangas: results });
            }).catch(err => console.log(err));
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
                            const userSession = req.session.passport.user;
                            if (userSession.favorites == null) {
                                return res.render(templates + 'profile.handlebars', { layout: false, user: userSession, favorites: 0 });
                            } else {
                                return res.render(templates + 'profile.handlebars', { layout: false, user: userSession, favorites: userSession.favorites });
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
                { url: 'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Oyasumi%20Punpun%2Fcapitulo%2001%20-%20Oyasumi%20Punpun%2F00.png?alt=media&token=a6a4a7df-cf75-4b24-bee1-d5d396791e34' },
                { url: 'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Oyasumi%20Punpun%2Fcapitulo%2001%20-%20Oyasumi%20Punpun%2F01-02.jpg?alt=media&token=7e24138a-a698-4f2b-a390-05f8c8e653a3' },
                { url: 'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Oyasumi%20Punpun%2Fcapitulo%2001%20-%20Oyasumi%20Punpun%2F02.png?alt=media&token=a93f3307-a85b-43bd-be94-49c6e949217d' },
                { url: 'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Oyasumi%20Punpun%2Fcapitulo%2001%20-%20Oyasumi%20Punpun%2F03.png?alt=media&token=92a48776-3403-48ff-ab7e-aae463c93c3b' },
                { url: 'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Oyasumi%20Punpun%2Fcapitulo%2001%20-%20Oyasumi%20Punpun%2F05.png?alt=media&token=0e157ca5-7677-4301-9477-0e3d09f4b860' },
                { url: 'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Oyasumi%20Punpun%2Fcapitulo%2001%20-%20Oyasumi%20Punpun%2F06.png?alt=media&token=0f816601-f1c7-4653-91f0-4894fa14044f' },
                { url: 'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Oyasumi%20Punpun%2Fcapitulo%2001%20-%20Oyasumi%20Punpun%2F07.png?alt=media&token=a5943a60-e218-4d66-aa7f-3fa119ed1245' },
                { url: 'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Oyasumi%20Punpun%2Fcapitulo%2001%20-%20Oyasumi%20Punpun%2F08.png?alt=media&token=b67b7343-7a61-481f-b3ad-3ae571562e4c' },
                { url: 'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Oyasumi%20Punpun%2Fcapitulo%2001%20-%20Oyasumi%20Punpun%2F09.png?alt=media&token=d77e487d-faa6-46f5-978e-2782324fe610' },
                { url: 'https://firebasestorage.googleapis.com/v0/b/alyah-bd.appspot.com/o/Oyasumi%20Punpun%2Fcapitulo%2001%20-%20Oyasumi%20Punpun%2F10.png?alt=media&token=df0928f3-7152-42e3-98f8-328c6e051024' }
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
    addImage() {
        return (req, res) => {
            const ImagesDao = require('../dao/images-dao');
            let imagesDao = new ImagesDao(db);
            let manga = req.body.manga;
            let chapter = req.body.chapter;
            let urls = req.body.urls;
            async function f1(url) {
                await imagesDao.createImages(
                    url,
                    chapter, manga);
            }
            res.send(req.body);
            //adicionar de forma sequencial e assincrona.
            (async () => {
                for (let url of urls) {
                    await f1(url);
                }
            })();
            db.query(
                `SELECT * FROM images;`,
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    // console.log("Images: ");
                    // console.log(results.rows);
                    res.send("Dados registrados : ", JSON.stringify(results.rows));
                }
            );
        };
    }
}
module.exports = RouteController;
