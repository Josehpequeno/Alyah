const templates = '../views/';
const { validationResult } = require('express-validator');
const UserDAO = require('../dao/user-dao');
const MangaDao = require('../dao/manga-dao');
const ChapterDao = require('../dao/chapter-dao');
const FavoriteListDao = require('../dao/favorite_list-dao');
const ImagesDao = require('../dao/images-dao');
const db = require('../config/db');
// const nodemailer = require('nodemailer');
const sha256 = require("crypto-js/sha256");
require('dotenv/config');
class RouteController {
    static routes() {
        return {
            home: '/',
            login: '/login',
            signup: '/signup',
            signout: '/signout',
            all: '/all',
            manga: '/manga/:name',
            popular: '/popular',
            profile: '/profile',
            editProfile: '/editprofile',
            changePassword: '/changepassword',
            mangaReader: '/mangaReader/:id/:name',
            addImage: '/AddImages',
            favorite: '/favorite'
        }
    }
    home() {
        return (req, res) => {
            let mangaDao = new MangaDao(db);
            let user = req.user;
            mangaDao.getAllMangas().then(results => {
                if (user) {
                    return res.render(templates + 'home.handlebars', { layout: false, title: 'Alyah', mangas: results, user: user });
                } else {
                    return res.render(templates + 'home.handlebars', { layout: false, title: 'Alyah', mangas: results });
                }
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
                return res.render(templates + 'login.handlebars', { layout: false, error: err.errors[0].msg, user: userReq });
            } else {
                const passport = req.passport;
                passport.authenticate('local', (err, user, info) => {
                    if (info) {
                        return res.render(templates + 'login.handlebars', { layout: false, user: userReq });
                    }
                    if (err) {
                        return res.render(templates + 'login.handlebars', { layout: false, error: err, user: userReq });
                    }
                    if (user) {
                        req.login(user, err => {
                            if (err) {
                                return next(err);
                            }
                            return res.redirect('/profile');
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
        return (req, res, next) => {
            const err = validationResult(req);
            let userReq = req.body;
            if (!err.isEmpty()) {
                return res.render(templates + 'signup.handlebars', { layout: false, error: err.errors[0].msg, user: userReq });
            }
            else {
                const userDAO = new UserDAO(db);
                userDAO.searchEmail(userReq.email).then(user => {
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
                            // return res.render(templates + 'profile.handlebars', { layout: false, user: user, favorites: 0 });
                            const passport = req.passport;
                            passport.authenticate('local', (err, user, info) => {
                                if (info) {
                                    return res.render(templates + 'login.handlebars', { layout: false, user: userReq });
                                }
                                if (err) {
                                    return res.render(templates + 'login.handlebars', { layout: false, error: err, user: userReq });
                                }
                                if (user) {
                                    req.login(user, err => {
                                        if (err) {
                                            return next(err);
                                        }
                                        return res.redirect('/profile');
                                    });
                                } else if (!user) {
                                    const msg = "Login or password filled out incorrectly!";
                                    return res.render(templates + 'login.handlebars', { layout: false, error: msg, user: userReq });
                                }
                            })(req, res, next);
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
            return res.redirect('/');
        }
    }
    all() {
        return (req, res) => {
            let user = req.user;
            let mangaDao = new MangaDao(db);
            mangaDao.getAllMangas().then(results => {
                if (user) {
                    return res.render(templates + 'all.handlebars', { layout: false, mangas: results, user: user });
                } else {
                    return res.render(templates + 'all.handlebars', { layout: false, mangas: results });
                }
            }).catch(err => console.log(err));
        }
    }
    manga() {
        return (req, res) => {
            let name = req.params.name;
            let user = req.user;
            let mangaDao = new MangaDao(db);
            mangaDao.getManga(name).then(manga => {
                let chapterDao = new ChapterDao(db);
                chapterDao.getChapters(name).then(chapters => {
                    if (user) {
                        let favoritesListDao = new FavoriteListDao(db);
                        favoritesListDao.ExitsFavoriteList(manga.id, user.favorites_id).then(bool => {
                            if (bool) {
                                return res.render(templates + 'manga.handlebars', { layout: false, manga: manga, chapters: chapters, favorites_id: user.favorites_id, favorited: bool });
                            }
                            return res.render(templates + 'manga.handlebars', { layout: false, manga: manga, chapters: chapters, favorites_id: user.favorites_id });
                        }).catch(err => console.log(err));
                    }
                    else {
                        return res.render(templates + 'manga.handlebars', { layout: false, manga: manga, chapters: chapters });
                    }
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }
    popular() {
        return (req, res) => {
            let user = req.user;
            let mangaDao = new MangaDao(db);
            mangaDao.getAllMangasOrderByFavorites().then(results => {
                if (user) {
                    return res.render(templates + 'popular.handlebars', { layout: false, mangas: results, user: user });
                } else {
                    return res.render(templates + 'popular.handlebars', { layout: false, mangas: results });
                }
            }).catch(err => console.log(err));
        }
    }
    profile() {
        return (req, res) => {
            let user = req.user;
            if (user) {
                let favoritesListDao = new FavoriteListDao(db);
                favoritesListDao.getAllMangaFavorited(user.favorites_id).then(results => {
                    let mangas = results;
                    req.user.favorites = mangas.length;
                    return res.render(templates + 'profile.handlebars', { layout: false, user: user, favorites: user.favorites, mangas: mangas });
                }).catch(err => console.log(err));
            } else {
                res.redirect('/login');
            }
        }
    }
    editProfile() {
        return (req, res) => {
            let user = req.user;
            if (user) {
                return res.render(templates + 'editProfile.handlebars', { layout: false, user: user, profile: user.profile });
            } else {
                res.redirect('/login');
            }
        }
    }
    makeEditProfile() {
        return (req, res) => {
            const err = validationResult(req);
            let userReq = req.body;
            if (!err.isEmpty()) {
                return res.render(templates + 'editProfile.handlebars', { layout: false, error: err.errors[0].msg, user: userReq });
            }
            userReq.description = req.body.description.trim();
            let userSession = req.user;
            let userDAO = new UserDAO(db);
            if (userSession.name != userReq.name) {
                userDAO.searchName(userReq.name).then(user => {
                    let msg = "This username is already being used!";
                    return res.render(templates + 'editProfile.handlebars', { layout: false, error: msg, user: userReq });
                }).catch(err => {
                    if (userSession.email != userReq.email) {
                        userDAO.searchEmail(userReq.email).then(user => {
                            let msg = "This email is already being used!";
                            return res.render(templates + 'editProfile.handlebars', { layout: false, error: msg, user: userReq });
                        }).catch(err => {
                            userDAO.updateUser(userSession.id, userReq.name, userReq.email, userReq.description, userReq.profile).then(() => {
                                req.user.name = userReq.name;
                                req.user.description = userReq.description;
                                req.user.profile = userReq.profile;
                                res.redirect('/profile');
                            }).catch(err => { console.log(err); });
                        });
                    } else {
                        userDAO.updateUser(userSession.id, userReq.name, userReq.email, userReq.description, userReq.profile).then(() => {
                            req.user.name = userReq.name;
                            req.user.description = userReq.description;
                            req.user.profile = userReq.profile;
                            res.redirect('/profile');
                        }).catch(err => { console.log(err); });
                    }
                });
            }
            else if (userSession.email != userReq.email) {
                userDAO.searchEmail(userReq.email).then(user => {
                    let msg = "This email is already being used!";
                    return res.render(templates + 'editProfile.handlebars', { layout: false, error: msg, user: userReq });
                }).catch(err => {
                    userDAO.updateUser(userSession.id, userReq.name, userReq.email, userReq.description, userReq.profile).then(() => {
                        req.user.name = userReq.name;
                        req.user.description = userReq.description;
                        req.user.profile = userReq.profile;
                        res.redirect('/profile');
                    }).catch(err => { console.log(err); });
                });
            } else {
                userDAO.updateUser(userSession.id, userReq.name, userReq.email, userReq.description, userReq.profile).then(() => {
                    req.user.name = userReq.name;
                    req.user.description = userReq.description;
                    req.user.profile = userReq.profile;
                    res.redirect('/profile');
                }).catch(err => { console.log(err); });
            }
        }
    }
    changePassword() {
        return (req, res) => {
            let user = req.user;
            if (user) {
                return res.render(templates + 'changePassword.handlebars', { layout: false });
            } else {
                res.redirect('/login');
            }
        }
    }
    makeChangePassword() {
        return (req, res) => {
            const err = validationResult(req);
            let user = req.user;
            let body = req.body;
            if (!err.isEmpty()) {
                return res.render(templates + 'changePassword.handlebars', { layout: false, error: err.errors[0].msg });
            }
            let userDao = new UserDAO(db);
            userDao.search(user.email).then(u => {
                if (sha256(body['current-password']) != u[0].password) {
                    let msg = "incorrect current password!";
                    return res.render(templates + 'changePassword.handlebars', { layout: false, error: msg });
                } else {
                    userDao.updateUserPassword(user.id, body.password).then(() => {
                        let msg = "password changed successfully!"
                        return res.render(templates + 'changePassword.handlebars', { layout: false, sucess: msg });
                    }).catch(err => { console.log(err); });
                }
            }).catch(err => console.log(err));
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
                    res.status(200).send("Dados registrados : " + JSON.stringify(results.rows));
                }
            );
        };
    }

    favorite() {
        return (req, res) => {
            let manga_id = req.body.data.manga_id;
            let favorites_id = req.body.data.favorites_id;
            let favorited = req.body.data.favorited;
            let favorite = new FavoriteListDao(db);
            if (favorited == 'true') {
                favorite.ExitsFavoriteList(manga_id, favorites_id).then(bool => {
                    if (bool) {
                        return bool;
                    }
                    favorite.addFavoriteList(manga_id, favorites_id).then(() => {
                        return !bool;
                    }).catch((err) => {
                        return err;
                    })
                }).catch(err => {
                    return err;
                })
            } else {
                favorite.ExitsFavoriteList(manga_id, favorites_id).then(bool => {
                    if (bool) {
                        favorite.removeFavoriteList(manga_id, favorites_id).then(() => {
                            return !bool;
                        }).catch((err) => {
                            return err;
                        })
                    }
                    return bool;
                }).catch(err => {
                    return err;
                })
            }
        };
    }
}
module.exports = RouteController;
