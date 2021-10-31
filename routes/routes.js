const RouteController = require('../controllers/route-controller');
const routeController = new RouteController();
const User = require('../models/user');
const jwt = require('../config/jwt');
const avatarController = require('../controllers/avatar-controller');
const ApiController = require('../controllers/api-controller');
const apiController = new ApiController();
module.exports = (app) => {
    const routes = RouteController.routes();
    const routesApi = ApiController.routes();

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

    app.get(routes.all, routeController.all());
    app.get(routes.manga, routeController.manga());
    app.get(routes.popular, routeController.popular());
    app.get(routes.profile, routeController.profile());
    app.get(routes.mangaReader, routeController.mangaReader());

    // *API
    app.post(routesApi.addManga, jwt.verify, apiController.addManga());
    app.post(routesApi.addChapter, jwt.verify, apiController.addChapter());
    app.post(routesApi.favorite, apiController.favorite());

    //* Rota de Upload de imagens na foto de perfil.
    app.post('/upload', avatarController);
}