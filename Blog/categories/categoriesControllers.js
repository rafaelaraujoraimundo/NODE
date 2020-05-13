const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')

const adminAuth = require ("../middleware/adminAuth")

router.get("/admin/categories/new",adminAuth, (req, res) => {
    res.render("admin/categories/new")
})

router.post("/admin/categories/save",adminAuth, (req, res) => {
    var titleform = req.body.title
    if (titleform != undefined) {
        Category.create({
            title: titleform,
            slug: slugify(titleform)
        }).then(() => {
            res.redirect("/admin/categories")
        })
    } else {
        res.redirect("/admin/categories/new")
    }
})

router.get("/admin/categories",adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("../views/admin/categories/index", { categories: categories })
    })

})

router.post("/categories/delete", adminAuth,(req, res) => {
    var idform = req.body.id;
    if (idform != undefined || !isNaN(idform)) {
        Category.destroy({
            where: {
                id: idform
            }
        }).then(() => {
            res.redirect("/admin/categories")
        })
    } else {
        res.redirect("/admin/categories")
    }
})

router.get("/admin/categories/edit/:id",adminAuth, (req, res) => {
    var idform = req.params.id

    if(isNaN(idform)){
        res.redirect("/admin/categories")
    }
    
    Category.findByPk(idform).then(categoria => {
        if (categoria != undefined) {

            res.render("admin/categories/edit",{categoria: categoria} )
        }
        else {
            res.redirect("/admin/categories")
        }
    }).catch(erro =>{
        res.redirect("/admin/categories")
    })
})

router.post("/admin/categories/update",adminAuth,(req,res)=>{
    var idform = req.body.id
    var titleform = req.body.title
    Category.update({title: titleform, slug: slugify(titleform)},{
        where: {
            id: idform
        }
    }).then(()=> {
        res.redirect("/admin/categories")
    })
})



module.exports = router