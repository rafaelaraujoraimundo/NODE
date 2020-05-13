const fs = require("fs")

/*
fs.readFile("./NODEjs/leitura/arquivo.txt",{encoding: 'utf-8'},(erro,dados) => {

    if(erro){
        console.log("Ocorreu uma falha durante a leitura do arquivo!");
        console.log(erro)
        } else {
            console.log(dados)
            conteudo = dados
            console.log(dados)
        }
})


fs.writeFile("./NODEjs/leitura/arquivo.txt","Nome: Rafael Araujo",(err) => {
    if(err){
        console.log("Erro: "+ err)
    }
} ) */
function modificarUsuario(nome, curso, categoria){

fs.readFile("./NODEjs/leitura/arquivo.json", { enconding: ' utf-8' }, (erro, dados) => {
    if (erro) {
        console.log("Um erro aconteceu")
    } else {
        var conteudo = JSON.parse(dados);
        conteudo.nome = nome
        conteudo.curso = curso
        conteudo.categoria = categoria
        console.log(conteudo)
        fs.writeFile("./NODEjs/leitura/arquivo.json", JSON.stringify(conteudo), (erro) => {
            if (erro) {
                console.log("Erro: " + erro)
            }
        })
    }
})

}

modificarUsuario("Ana Luiza", "WEbModerno", "Desenvolvimento Web")
