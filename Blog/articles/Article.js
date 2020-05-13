const Sequelize = require("sequelize")
const connection = require("../database/database")

const Category = require("../categories/Category")

const Article = connection.define('articles',{
title:{
    type: Sequelize.STRING,
    allowNull: false
}, slug: {
    type: Sequelize.STRING,
    allowNull: false
}, body:
{
    type: Sequelize.TEXT,
    aloowNull: false
}

})



//criar relacionamento entre Category com Articles
// M -> 1
Category.hasMany(Article)
// 1 Artigo pertence a categoria
//1 para 1
Article.belongsTo(Category)

//SOmente se houver alteração na estrutura da tabela ou relacionamento para ele recriar tabelas
//Article.sync({force:true})

module.exports = Article;