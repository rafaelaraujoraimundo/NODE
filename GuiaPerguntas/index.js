const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")
//database
connection.authenticate().then(() => {
    console.log("conexão feita com sucesso")
})
    .catch((msgErro) => {
        console.log(msgErro)
    })


// Expressar usar o EJS como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//http://localhost:8080/Rafael/JS
app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC'] //ASC - Crescente // DESC = DECRESCEBET
    ]}).then(perguntas => {
        console.log(perguntas)

        res.render("index", {
            perguntas: perguntas
        })

    })



})

app.get("/perguntar", (req, res) => {

    res.render("perguntar")

})

app.post("/salvarPergunta", (req, res) => {
    var tituloForm = req.body.titulo
    var descricaoForm = req.body.descricao
    Pergunta.create({
        titulo: tituloForm,
        descricao: descricaoForm
    }).then(() => {
        res.redirect("/")
    })


})

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: {id: id},
        
    }).then(pergunta => {
        if(pergunta != undefined){ //pergunta encontrada
            
            Resposta.findAll({ 
                where: {perguntaId: pergunta.id},
                order:[
                    ['id','DESC']]
            }
                ).then(respostas => {
                    res.render("pergunta",{
                        pergunta: pergunta,
                        respostas: respostas
                    })

                })
            
            
           
        } else { //nao encontrada
            res.redirect("/")
        }
    })

})

app.post("/responder", (req, res) => {
    var corpoFrm = req.body.corpo
    var perguntaFrm = req.body.pergunta
    Resposta.create({
        corpo: corpoFrm,
        perguntaId: perguntaFrm
    }).then(() => {
        res.redirect("/pergunta/"+ perguntaFrm)
    })
})

app.listen(8080, () => {
    console.log("App Rodando");
})

