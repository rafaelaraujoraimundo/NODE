const fs = require('fs')
const util = require("util")


class Reader {

    constructor(){
        //Pega uma função com callbak e transforme em uma com Promisse
        this.reader = util.promisify(fs.readFile)
    }

    async Read(filepath) {

        try {
            return await this.reader(filepath, "utf8")
        } catch (err){
            return undefined
        }

        
        }


    
}

module.exports = Reader