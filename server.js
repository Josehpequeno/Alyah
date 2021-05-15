const http = require('http');
const verde = '\u001b[32m';
const reset = '\u001b[0m';
//const path = require('path');
const customExpress = require('./config/custom-express');
const app = customExpress();

app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "localhost");
app.set('view engine', 'html');
/*
app.get("/", function (req, res) {
    //res.sendFile(path.join(__dirname, '../Alyah/views/index.html'));//utilizando o html de views.
})*/

http.createServer(app).listen(3000, () =>
    console.log(verde + "Servidor rodando localmente em http://%s:%s" + reset,
        app.get("host"),
        app.get("port"))
);