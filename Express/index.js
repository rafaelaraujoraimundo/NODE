const express = require('express') //importando o express
const app = express() // iniciando o express na variavel


app.get("/", function (req, res) {
    res.send("Bem vindo ao site")
});

app.get("/Blog/:artigo?", function (req, res) {
    var artigo = req.params.artigo
    if(artigo)
    {
        res.send("Bem vindo ao Blog pelo artigo " + artigo)
    }else{
    
    res.send("Bem vindo ao Blog")
    }
});

app.get("/canal/youtube", function (req, res) {

    var canal = req.query["Canal"]
   
    if(canal){
        res.send(canal)
    }else{
        res.send("Não enviou canal")
    }
  
    //res.send("Bem vindo ao meu canal do Youtube")
});

app.get("/Ola/:nome/:empresa", function (req, res) {
    // REQ = dados enviados pelo usuario
    var nome = req.params.nome
    var empresa = req.params.empresa
    // RES = dados que serão repsondido para o usuario
    res.send("Olá: "+ req.params.nome +" do " + empresa)
});


app.listen(4000, function (erro) {
    if (erro) {
        console.log("Ocorreu um erro!")
    } else {
        console.log("Servidor Iniciado com Sucesso!")
    }
})