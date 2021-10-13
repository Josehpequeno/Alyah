const RouteController = require('../controllers/route-controller');
const routeController = new RouteController();
const User = require('../models/user');
const jwt = require('../config/jwt');
module.exports = (app) => {
    const routes = RouteController.routes();

    app.get(routes.home, routeController.home());
    app.get(routes.signout, routeController.signout());

    app.route(routes.login)
        .get(routeController.login())
        .post(User.validationsLogin(), routeController.makeLogin());
    app.route(routes.signup)
        .get(routeController.signup())
        .post(User.validations(), routeController.makeSignup());
    app.route(routes.editProfile)
        .get(routeController.editProfile())
        .post(User.validationsEditProfile(), routeController.makeEditProfile());
    app.route(routes.changePassword)
        .get(routeController.changePassword())
        .post(User.validationsChangePassword(), routeController.makeChangePassword());

    app.get(routes.mangas, routeController.mangas());
    app.get(routes.manga, routeController.manga());
    app.get(routes.populares, routeController.populares());
    app.get(routes.profile, routeController.profile());
    app.get(routes.mangaReader, routeController.mangaReader());

    // *API
    app.post(routes.addImage, jwt.verify, routeController.addImage());
    app.post(routes.favorite, routeController.favorite());
}