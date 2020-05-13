const express = require('express')
const router = express.Router()
const Category = require("../categories/Category")
const Article = require('./Article')
const slugify = require('slugify')
const adminAuth = require ("../middleware/adminAuth")


router.get("/admin/articles", adminAuth,   (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render('admin/articles/index.ejs', { articles: articles, user: req.session.user})
    })

})


router.get("/admin/articles/new", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories: categories, user: req.session.user })
    })

})

router.post("/admin/articles/save",adminAuth, (req, res) => {
    var titleform = req.body.title
    var bodyform = req.body.body
    var category = req.body.category

    Article.create({
        title: titleform,
        slug: slugify(titleform),
        body: bodyform,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles")
    })
})

router.post("/articles/delete" , adminAuth, (req, res) => {
    var idform = req.body.id;
    if (idform != undefined || !isNaN(idform)) {
        Article.destroy({
            where: {
                id: idform
            }
        }).then(() => {
            res.redirect("/admin/articles",{user: req.session.user})
        })
    } else {
        res.redirect("/admin/articles", {user: req.session.user})
    }
})

router.get("/admin/articles/edit/:id",adminAuth, (req, res) => {
    var idform = req.params.id;
    Article.findByPk(idform).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", { categories: categories, article: article, user: req.session.user })
            })

        } else {
            res.redirect("/")
        }

    }).catch(err => {
        res.redirect("/")
    })
})

router.post("/admin/articles/update",adminAuth, (req, res) => {
    var idform = req.body.id
    var titleform = req.body.title
    var bodyform = req.body.body
    var categoryform = req.body.category
    debugger
    Article.update({ title: titleform, body: bodyform, categoryId: categoryform, slug: slugify(titleform) },
        {
            where: {
                id: idform
            }
        }).then(() => {
            res.redirect("/admin/articles" ,{user: req.session.user})
        }).catch(err => {
            res.redirect("/admin/articles", {user: req.session.user})
        })
})


router.get("/articles/page/:num",(req, res) => {
    var page = req.params.num;
    var offset = 0;

    if(isNaN(page) || page == 1){
        offset = 0;
    }else{
        offset = (parseInt(page) - 1) * 4;
    }
    
    Article.findAndCountAll({
        order:[
            ['id','DESC']
        ],
        limit: 4,
        offset: offset,
    }).then(articles => {
        var next;
        if(offset + 4 >= articles.count){
            next = false;
        }else{
            next = true;
        }

        var result = {
            page: parseInt(page),
            next: next,
            articles : articles
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page",{result: result, categories: categories, user: req.session.user})
        });
    })


})

module.exports = router