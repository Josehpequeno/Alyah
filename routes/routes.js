const RouteController = require('../controllers/route-controller');
const routeController = new RouteController();

module.exports = (app) => {
    const routes = RouteController.routes();

    app.get(routes.home, routeController.home());
    app.get(routes.login, routeController.login());
    app.get(routes.signup, routeController.signup());
}