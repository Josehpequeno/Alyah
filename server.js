const http =  require("http");
const express = require("express");
const verde = '\u001b[32m';
const reset = '\u001b[0m';




const app = express();

app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "localhost");
app.set('view engine', 'html');

app.get("/", function(req,res){
    res.render("index");
})

http.createServer(app).listen(3000, () => 
console.log(verde+"Servidor rodando localmente em http://%s:%s"+reset,
app.get("host"),
app.get("port"))
);