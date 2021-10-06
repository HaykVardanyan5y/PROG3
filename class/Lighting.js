const LivingCreature = require("./LivingCreature");
var random = require("./random.js");

module.exports = class Lighting extends LivingCreature {
    constructor(x, y, id) {
        super(x,y,id)
        this.energy = 2
        this.directions = []
    }
    run() {
        // directions Lighting
        for (var i = 0; i < matrix.length; i++) {
            if (i % 6 == 2 || i % 6 == 3) {
                if (this.y - 1 < matrix.length && this.y - 1 >= 0) {
                    this.directions.push([i, this.y - 1])
                }
            }
            else if (i % 6 == 5) {
                if (this.y + 1 < matrix.length && this.y + 1 >= 0) {
                    this.directions.push([i, this.y + 1])
                }
            } else {
                this.directions.push([i, this.y])
            }
        }
        for (var j = 0; j < matrix.length; j++) {
            if (j % 7 == 1 || j % 7 == 2) {
                if (this.x - 1 < matrix.length - 1 && this.x - 1 >= 0) {
                    this.directions.push([this.x - 1, j])
                }
            }
            else if (j % 7 == 4 || j % 7 == 6) {
                if (this.x - 1 < matrix.length - 1 && this.x - 1 >= 0) {
                    this.directions.push([this.x + 1, j])
                }
            } else {
                this.directions.push([this.x, j])
            }

        }
        //

        this.spawn()
        this.die()
    }
    spawn() {
        for (var i in this.directions) {
            var newX = this.directions[i][0]
            var newY = this.directions[i][1]
            matrix[newY][newX] = this.id
        }
        for(var i in grassArr){
            for (var a in this.directions) {
                var newX = this.directions[a][0]
                var newY = this.directions[a][1]
                if(grassArr[i].x == newX && grassArr[i].y == newY){
                    grassArr.splice(i,1)
                    break
                }
            }
        }
    }
    die() {
        if (this.energy <= 0) {
            for (var i in LightingArr) {
                if (LightingArr[i].x == this.x && LightingArr[i].y == this.y) {
                    LightingArr.splice(i, 1)
                    break
                }
            }
            for (var i in this.directions) {
                var newX = this.directions[i][0]
                var newY = this.directions[i][1]
                matrix[newY][newX] = 0
            }
        }
        this.energy--
    }
}
