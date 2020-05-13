const Sequelize = require("sequelize")
const connection = require("../database/database")

const Category = connection.define('categories',{
title:{
    type: Sequelize.STRING,
    allowNull: false
}, slug: {
    type: Sequelize.STRING,
    allowNull: false
}

})
//SOmente se houver alteração na estrutura da tabela ou relacionamento para ele recriar tabelas
//Category.sync({force:true})
module.exports = Category;