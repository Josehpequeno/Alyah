const RouteController = require('../controllers/route-controller');
const routeController = new RouteController();
module.exports = (app) => {
    const routes = RouteController.routes();

    app.get(routes.home, routeController.home());
    app.get(routes.login, routeController.login());
    app.get(routes.signup, routeController.signup());
    app.get(routes.mangas, routeController.mangas());
    app.get(routes.manga, routeController.manga());
    app.get(routes.populares, routeController.populares());
    app.get(routes.profile, routeController.profile());
    app.get(routes.editProfile, routeController.editProfile());
    app.get(routes.changePassword, routeController.changePassword());
    app.get(routes.mangaReader, routeController.mangaReader());
}