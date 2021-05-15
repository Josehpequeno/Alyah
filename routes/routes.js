const RouteController = require('../controllers/route-controller');
const routeController = new RouteController();

module.exports = (app) => {
    const routes = RouteController.routes();

    app.get(routes.home, routeController.home());
}