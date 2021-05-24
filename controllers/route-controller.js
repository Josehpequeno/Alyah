const createApp = require('../config/app');

class RouteController {
    static routes() {
        return {
            home: '/',
            login: '/login',
            signup: '/signup',
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
            //console.log(templates);
            const template = require('fs').readFileSync('views/home.html', 'utf-8');

            const renderer = require('vue-server-renderer').createRenderer({
                template,
            });
            const context = {
                title: 'Alyah',
                meta: `<meta charset="utf-8"/>`,
                url: req.url
            };
            const appVue = createApp(context);
            renderer
                .renderToString(appVue, context, (err, html) => {
                    if (err) {
                        console.log(err);
                        res.status(500).end('Internal Server Error');
                        return;
                    }
                    res.end(html);
                })
        }
    }
    login() {
        return (req, res) => {
            const template = require('fs').readFileSync('views/login.html', 'utf-8');

            const renderer = require('vue-server-renderer').createRenderer({
                template,
            });
            const context = {
                title: 'Alyah',
                meta: `<meta charset="utf-8"/>`,
                url: req.url
            };
            const appVue = createApp(context);
            renderer
                .renderToString(appVue, context, (err, html) => {
                    if (err) {
                        console.log(err);
                        res.status(500).end('Internal Server Error');
                        return;
                    }
                    res.end(html);
                })
        }
    }
    signup() {
        return (req, res) => {
            //console.log(templates);
            const template = require('fs').readFileSync('views/signup.html', 'utf-8');

            const renderer = require('vue-server-renderer').createRenderer({
                template,
            });
            const context = {
                title: 'Alyah',
                meta: `<meta charset="utf-8"/>`,
                url: req.url
            };
            const appVue = createApp(context);
            renderer
                .renderToString(appVue, context, (err, html) => {
                    if (err) {
                        console.log(err);
                        res.status(500).end('Internal Server Error');
                        return;
                    }
                    res.end(html);
                })
        }
    }
    mangas() {
        return (req, res) => {
            //console.log(templates);
            const template = require('fs').readFileSync('views/mangas.html', 'utf-8');

            const renderer = require('vue-server-renderer').createRenderer({
                template,
            });
            const context = {
                title: 'Alyah',
                meta: `<meta charset="utf-8"/>`,
                url: req.url
            };
            const appVue = createApp(context);
            renderer
                .renderToString(appVue, context, (err, html) => {
                    if (err) {
                        console.log(err);
                        res.status(500).end('Internal Server Error');
                        return;
                    }
                    res.end(html);
                })
        }
    }
    manga() {
        return (req, res) => {
            //console.log(templates);
            const template = require('fs').readFileSync('views/manga.html', 'utf-8');

            const renderer = require('vue-server-renderer').createRenderer({
                template,
            });
            const context = {
                title: 'Alyah',
                meta: `<meta charset="utf-8"/>`,
                url: req.url
            };
            const appVue = createApp(context);
            renderer
                .renderToString(appVue, context, (err, html) => {
                    if (err) {
                        console.log(err);
                        res.status(500).end('Internal Server Error');
                        return;
                    }
                    res.end(html);
                })
        }
    }
    populares() {
        return (req, res) => {
            //console.log(templates);
            const template = require('fs').readFileSync('views/populares.html', 'utf-8');

            const renderer = require('vue-server-renderer').createRenderer({
                template,
            });
            const context = {
                title: 'Alyah',
                meta: `<meta charset="utf-8"/>`,
                url: req.url
            };
            const appVue = createApp(context);
            renderer
                .renderToString(appVue, context, (err, html) => {
                    if (err) {
                        console.log(err);
                        res.status(500).end('Internal Server Error');
                        return;
                    }
                    res.end(html);
                })
        }
    }
    profile() {
        return (req, res) => {
            const template = require('fs').readFileSync('views/profile.html', 'utf-8');

            const renderer = require('vue-server-renderer').createRenderer({
                template,
            });
            const context = {
                title: 'Alyah',
                meta: `<meta charset="utf-8"/>`,
                url: req.url
            };
            const appVue = createApp(context);
            renderer
                .renderToString(appVue, context, (err, html) => {
                    if (err) {
                        console.log(err);
                        res.status(500).end('Internal Server Error');
                        return;
                    }
                    res.end(html);
                })
        }
    }
    editProfile() {
        return (req, res) => {
            const template = require('fs').readFileSync('views/editProfile.html', 'utf-8');

            const renderer = require('vue-server-renderer').createRenderer({
                template,
            });
            const context = {
                title: 'Alyah',
                meta: `<meta charset="utf-8"/>`,
                url: req.url
            };
            const appVue = createApp(context);
            renderer
                .renderToString(appVue, context, (err, html) => {
                    if (err) {
                        console.log(err);
                        res.status(500).end('Internal Server Error');
                        return;
                    }
                    res.end(html);
                })
        }
    }
    changePassword() {
        return (req, res) => {
            const template = require('fs').readFileSync('views/changePassword.html', 'utf-8');

            const renderer = require('vue-server-renderer').createRenderer({
                template,
            });
            const context = {
                title: 'Alyah',
                meta: `<meta charset="utf-8"/>`,
                url: req.url
            };
            const appVue = createApp(context);
            renderer
                .renderToString(appVue, context, (err, html) => {
                    if (err) {
                        console.log(err);
                        res.status(500).end('Internal Server Error');
                        return;
                    }
                    res.end(html);
                })
        }
    }
    mangaReader() {
        return (req, res) => {
            const template = require('fs').readFileSync('views/mangaReader.html', 'utf-8');

            const renderer = require('vue-server-renderer').createRenderer({
                template,
            });
            const context = {
                title: 'Alyah',
                meta: `<meta charset="utf-8"/>`,
                url: req.url
            };
            const appVue = createApp(context);
            renderer
                .renderToString(appVue, context, (err, html) => {
                    if (err) {
                        console.log(err);
                        res.status(500).end('Internal Server Error');
                        return;
                    }
                    res.end(html);
                })
        }
    }
}
module.exports = RouteController;
