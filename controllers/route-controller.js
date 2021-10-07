const templates = '../views/';
const { validationResult } = require('express-validator');
const UserDAO = require('../dao/user-dao');
const MangaDao = require('../dao/manga-dao');
const AuthorDao = require('../dao/author-dao');
const ChapterDao = require('../dao/chapter-dao');
const ImagesDao = require('../dao/images-dao');
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
            manga: '/manga/:name',
            populares: '/populares',
            profile: '/profile',
            editProfile: '/editprofile',
            changePassword: '/changepassword',
            mangaReader: '/mangaReader/:id/:name',
            addImage: '/AddImages'
        }
    }
    home() {
        return (req, res) => {
            let mangaDao = new MangaDao(db);
            mangaDao.getAllMangas().then(results => {
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
            let mangaDao = new MangaDao(db);
            mangaDao.getAllMangas().then(results => {
                return res.render(templates + 'mangas.handlebars', { layout: false, mangas: results });
            }).catch(err => console.log(err));
        }
    }
    manga() {
        return (req, res) => {
            let name = req.params.name;
            let mangaDao = new MangaDao(db);
            mangaDao.getManga(name).then(manga => {
                let chapterDao = new ChapterDao(db);
                chapterDao.getChapters(name).then(chapters => {
                    return res.render(templates + 'manga.handlebars', { layout: false, manga: manga, chapters: chapters });
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }
    populares() {
        return (req, res) => {
            let mangaDao = new MangaDao(db);
            mangaDao.getAllMangasOrderByFavorites().then(results => {
                return res.render(templates + 'populares.handlebars', { layout: false, mangas: results });
            }).catch(err => console.log(err));
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
            let id = req.params.id;
            let name = req.params.name;
            let imagesDao = new ImagesDao(db);
            imagesDao.getAllUrls(id).then(urls => {
                let items = [];
                urls.forEach(url => {
                    items.push(url);
                });
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
                return res.render(templates + 'mangaReader.handlebars', { layout: false, items: items, options: opt, images: images, length: i, manga: name });
            }).catch(err => console.log(err));
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
