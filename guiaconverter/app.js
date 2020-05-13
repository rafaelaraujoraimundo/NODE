var Reader = require("./Reader")
var Processor = require("./Processor")
var Table = require("./Table")
var HtmlParser = require ('./HtmlParser')
var Writer = require ('./Writer')
var PDFWriter = require('./PDFWriter')

var leitor = new Reader()
var escritor = new Writer()


async function main(){
    var dados = await leitor.Read("./Pasta1.csv")
    var dadosProcessado = Processor.Process(dados)
    var usuarios = new Table(dadosProcessado)
    //console.log(usuarios.RowCount)
    //console.log(usuarios.ColumnCount)
    var html = await HtmlParser.Parse(usuarios)
    
    escritor.Write(`${Date.now()}.html`,html)
    PDFWriter.writePDF(`${Date.now()}.pdf`,html)
}

main()
