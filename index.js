const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = 3000;

// use ejs as a view engine
app.set("view engine", "ejs");
// use static files 
app.use(express.static("public"));
// configure bodyParser 
app.use(bodyParser.urlencoded({ extended: false })); // false means that the body parser will be just strings 
app.use(bodyParser.json());

// -------- routes -------- 

app.get("/", (req, res) => {
    var nome = "Hélio";
    var lang = "JS";
    res.render("index.ejs", { 
        nome: nome, 
        lang: lang
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar.ejs");
});

app.post("/salvarPergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulario Recebido!" + titulo + descricao);

});



app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});

// -- teste --