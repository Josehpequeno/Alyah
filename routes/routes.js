const RouteController = require('../controllers/route-controller');
const routeController = new RouteController();
const createApp = require('../config/app');

module.exports = (app) => {
    const routes = RouteController.routes();

    app.get(routes.home, routeController.home());
    app.get(routes.login, routeController.login());
    app.get(routes.signup, routeController.signup());
    app.get(routes.manga, routeController.manga());
    app.get(routes.populares, routeController.populares());
    app.get(routes.profile, routeController.profile());
    
    app.use(function (req, res, next) {
        const template = require('fs').readFileSync('views/404.html', 'utf-8');

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
                res.status(404).end(html);
            })
    });
    app.use(function (err,req, res, next) {
            console.error(err.stack);
            const template = require('fs').readFileSync('views/500.html', 'utf-8');
            
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
                res.status(500).end(html);
            })
    });
}