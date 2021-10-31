const customExpress = require('./config/custom-express');
const app = customExpress();
const token = require('./config/token');
var colors = require('colors');

app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "localhost");

if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV = 'Local';
}

app.listen(app.get("port"), () =>
    console.log(colors.green("%s server running on http://%s:%s"),
        process.env.NODE_ENV,
        app.get("host"),
        app.get("port"))
);
