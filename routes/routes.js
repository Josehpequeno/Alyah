const RouteController = require('../controllers/route-controller');
const routeController = new RouteController();
const User = require('../models/user');
module.exports = (app) => {
    const routes = RouteController.routes();

    app.get(routes.home, routeController.home());
    app.get(routes.login, routeController.login());
    app.route(routes.signup)
    .get(routeController.signup())
    .post(User.validacoes(), routeController.makeSignup());
    
    app.get(routes.mangas, routeController.mangas());
    app.get(routes.manga, routeController.manga());
    app.get(routes.populares, routeController.populares());
    app.get(routes.profile, routeController.profile());
    app.get(routes.editProfile, routeController.editProfile());
    app.get(routes.changePassword, routeController.changePassword());
    app.get(routes.mangaReader, routeController.mangaReader());
}