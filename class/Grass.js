var LivingCreature = require("./LivingCreature")
var random = require("./random.js");
var server = require('../server.js')
module.exports = class Grass extends LivingCreature {
    mul(){
        this.multiply++
        var nwCell = random(this.chooseCell(0))
        if(this.multiply >= server.mull && nwCell){
            // console.log(mullt);
            var nwGrass = new Grass(nwCell[0],nwCell[1],this.id)
            grassArr.push(nwGrass)
            matrix[nwCell[1]][nwCell[0]] = this.id
            this.multiply = 0
        }
    }
}
