const express = require('express');
const consign = require('consign');
var compression = require('compression');
var exphbs = require('express-handlebars');
const templates = '../views/';
// const jwt = require('jsonwebtoken'); //token
require('dotenv/config');
module.exports = () => {
    const app = express();
    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');
    //the rest of your express routes.
    app.use('/static', express.static('public'));
    app.use('/nd_md', express.static('node_modules'));
    app.use(express.static('views'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    require('./auth')(app);
    consign().include('routes').into(app);
    //* Token para o uso da api.
    // const token = jwt.sign({ id: 0 }, process.env.SECRET, {
    //     expiresIn: 300 // expires in 5min
    // });
    // console.log(token);
    app.use(function (req, res, next) {
        return res.status(404).render(templates + '404.handlebars', { layout: false });
    });
    app.use(function (err, req, res, next) {
        console.log(err);
        return res.status(500).render(templates + '500.handlebars', { layout: false, error: err });
    });
    app.use(compression);//compactação gzip.
    return app;
};