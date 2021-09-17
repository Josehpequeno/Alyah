const green = '\u001b[32m';
const reset = '\u001b[0m';
const customExpress = require('./config/custom-express');
const app = customExpress();

app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "localhost");
/*
app.get("/", function (req, res) {
    //res.sendFile(path.join(__dirname, '../Alyah/views/index.html'));//utilizando o html de views.
})*/
if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV = 'Local';
}
//http.createServer(app).listen(3000, () =>
app.listen(app.get("port"), () =>
    console.log(green + "%s servidor rodando localmente em http://%s:%s" + reset,
        process.env.NODE_ENV,
        app.get("host"),
        app.get("port"))
);
