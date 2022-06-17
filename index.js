const express = require("express"); // import express 
const app = express(); // create app instance with express 
const PORT = 3000; // port number
const bodyParser = require("body-parser"); // import body-parser 
const connection = require("./database/Database"); // create connection  
const Perguntas = require("./database/Perguntas"); // create Perguntas database
const Respostas = require("./database/Respostas"); // create Respostas database

//database connection 
connection.authenticate()
.then(() => {
    console.log("connection established");
}).catch(() => { 
    console.log("connection error"); 
}); 
// Server listen 
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});

// use ejs as a view engine
app.set("view engine", "ejs");
// use static files 
app.use(express.static("public"));
// configure bodyParser 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

// -------- routes -------- 

// ------------- main route -------------
app.get("/", (req, res) => {
    Perguntas.findAll({raw: true, order:[["id","DESC"]]}) // "same" as SELECT * FROM perguntas 
    .then(perguntas => { 
        res.render("index.ejs", { 
            perguntas: perguntas // throw perguntas to index.ejs 
        });
    });
});

// ------------- Perguntar routes -------------
app.get("/perguntar", (req, res) => {
    res.render("perguntar.ejs");
});

app.post("/salvarPergunta", (req, res) => {
    var titulo = req.body.titulo; // save the field titulo in the variable titulo 
    var descricao = req.body.descricao; // save the field descricao in the variable descricao 
    Perguntas.create({ // create a new Perguntas table 
        titulo: titulo,
        descricao: descricao
    }).then(() => {
    res.redirect("/"); 
    });
});

//------------- Pergunta route -------------
app.get("/pergunta/:id", (req,res) => {
    var id = req.params.id; // save the params id in the variable id 
    Perguntas.findOne({ // find one field of Perguntas table 
        where: {id: id}// compare the id of Perguntas table with the id passed by params 
    }).then(pergunta => {
        if(pergunta != undefined){ // pergunta fonded 
            Respostas.findAll({
                where: {perguntaID: pergunta.id},
                order:[["id","DESC"]]
            }).then(respostas => {
                res.render("pergunta.ejs",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{ //pergunta not found
            res.redirect("/");
        }
    });     
});

// ------------- SaveResposta route -------------
app.post("/salvarResposta/:perguntaID", (req, res) => {
    var perguntaID = req.params.perguntaID; 
    var corpo = req.body.corpo;
    Respostas.create({ 
        perguntaID: perguntaID,
        corpo: corpo
    }).then(() => {
    res.redirect("/pergunta/"+perguntaID);
    });
});
