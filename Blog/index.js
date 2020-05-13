const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const session = require('express-session')

// LInka rota de outro arquivo
const categoriesController = require('./categories/categoriesControllers')
const articlesController = require('./articles/articlesController')
const usersController = require("./user/userController")

//importar models
const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require('./user/user')
//view engine
app.set('view engine', 'ejs')
//Static

//redis - banco para salvamento de Cokkies e session


app.use(express.static('public'))
// configurar sessao
// maxAge em miliseguind
// 1000 = 1 Seg
// 60000 = 1 minuto
app.use(session({
    secret: "qualquercoisa", cookie: { maxAge: 300000000000 }
})
)

//Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Database conectando utilizando sequelize

connection
    .authenticate()
    .then(() => {
        console.log("Conectado com sucesso!")
    }).catch((err) => {
        console.log(err)
    })
///

//Executando rotas com os JS em outrs arquivos
app.use("/", categoriesController)
app.use("/", articlesController)
app.use("/", usersController)

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", { articles: articles, categories: categories })
        })

    })

})


app.get("/:slug", (req, res) => {
    var slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", { article: article, categories: categories })
            })

        } else {
            res.redirect("/")
        }
    }).catch(err =>
        res.redirect("/"))


})

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }]
    }).then(category => {
        if (category != undefined) {

            Category.findAll().then(categories => {
                res.render("index", { articles: category.articles, categories: categories })
            })

        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
})

/* Exemplo de utilização e leitura de session
app.get("/admin/session", (req, res) => {
    req.session.treinamento = "Formação Node.Js"
    req.session.ano = 2019
    req.session.email = "rafael.araujo2005@gmail.com"
    req.session.user = {
        username: "Rafael",
        email: "email@email.com",
        id: 10
    }
    res.send("Rota Gerada")
}
)

app.get("/admin/leitura", (req, res) => {
   
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        email: req.session.email,
        user: req.session.user
    })
}) */

app.listen(8080, () => {
    console.log("O servidor esta rodando na porta 8080")
})