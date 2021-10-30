const green = '\u001b[32m';
const reset = '\u001b[0m';
const customExpress = require('./config/custom-express');
const app = customExpress();

app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "localhost");

if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV = 'Local';
}

app.listen(app.get("port"), () =>
    console.log(green + "%s servidor rodando localmente em http://%s:%s" + reset,
        process.env.NODE_ENV,
        app.get("host"),
        app.get("port"))
);
