const LivingCreature = require("./LivingCreature");
const Grass = require("./Grass");
var random = require("./random.js");

module.exports = class Deffend extends LivingCreature {
    constructor(x, y, id,size) {
        super(x,y,id)
        this.energy = 20
        this.size = size
        this.directions = [
            [this.x, this.y]
        ]
    }

    run() {
        // if vor this.directions length chlini ankap mec tiv
        if(this.directions.length <=1 ){
            for (var i = 0; i <= this.size; i++) {
                for (var j = 0; j <= this.size; j++) {
                    for (var k = 0; k <= this.size; k++) {
                        if (i + j == k) {
                            this.directions.push([this.x - i, this.y - j])
                            this.directions.push([this.x - i, this.y + j])
                            this.directions.push([this.x + i, this.y - j])
                            this.directions.push([this.x + i, this.y + j])
                        }
                    }
                }
            }
        }
        this.spawn()
        this.die()
    }

    spawn() {
        for (var i in this.directions) {
            var newX = this.directions[i][0]
            var newY = this.directions[i][1]
            if (newX >= 0 && newX < matrix.length && newY >= 0 && newY < matrix.length) {
                for(var a in grassArr){
                    if(grassArr[a].x == newX && grassArr[a].y == newY){
                        grassArr.splice(a,1)
                        break
                    }
                }
                for(var b in fireArr){
                    if(fireArr[b].x == newX && fireArr[b].y == newY){
                        fireArr.splice(b,1)
                        break
                    }
                }
                for(var c in predArr){
                    if(predArr[c].x == newX && predArr[c].y == newY){
                        predArr.splice(c,1)
                        break
                    }
                }
                matrix[newY][newX] = this.id
            }
        }
    }

    die() {
        if (this.energy <= 0) {
            for (var i in DEFArr) {
                if (DEFArr[i].x == this.x && DEFArr[i].y == this.y) {
                    DEFArr.splice(i, 1)
                    break
                }
            }
            for (var i in this.directions) {
                var newX = this.directions[i][0]
                var newY = this.directions[i][1]
                if (newX >= 0 && newX < matrix.length && newY >= 0 && newY < matrix.length) {
                    matrix[newY][newX] = 1
                }

                var nwGrass = new Grass(newX, newY, 1)
                grassArr.push(nwGrass);
            }
        }
        this.energy--
    }

}
