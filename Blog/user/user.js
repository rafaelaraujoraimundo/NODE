const Sequelize = require("sequelize")
const connection = require("../database/database")

const User = connection.define('users',{
email:{
    type: Sequelize.STRING,
    allowNull: false
}, password: {
    type: Sequelize.STRING,
    allowNull: false
}

})
//SOmente se houver altera��o na estrutura da tabela ou relacionamento para ele recriar tabelas
//User.sync({force:true})
module.exports = User;