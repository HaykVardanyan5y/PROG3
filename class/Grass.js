var LivingCreature = require("./LivingCreature")
var random = require("./random.js");
var { weather } = require('../server.js')

module.exports = class Grass extends LivingCreature {
    mul(){
        this.multiply++
        var nwCell = random(this.chooseCell(0))
        if(this.multiply >= 8 && nwCell && weather == "winter"){
            var nwGrass = new Grass(nwCell[0],nwCell[1],this.id)
            grassArr.push(nwGrass)
            matrix[nwCell[1]][nwCell[0]] = this.id
            this.multiply = 0
        }
        if(this.multiply >= 6 && nwCell && weather == "spring"){
            var nwGrass = new Grass(nwCell[0],nwCell[1],this.id)
            grassArr.push(nwGrass)
            matrix[nwCell[1]][nwCell[0]] = this.id
            this.multiply = 0
        }
        if(this.multiply >= 7 && nwCell && weather == "summer"){
            var nwGrass = new Grass(nwCell[0],nwCell[1],this.id)
            grassArr.push(nwGrass)
            matrix[nwCell[1]][nwCell[0]] = this.id
            this.multiply = 0
        }
        if(this.multiply >= 4 && nwCell && weather == "hutumn"){
            var nwGrass = new Grass(nwCell[0],nwCell[1],this.id)
            grassArr.push(nwGrass)
            matrix[nwCell[1]][nwCell[0]] = this.id
            this.multiply = 0
        }
    }
}
