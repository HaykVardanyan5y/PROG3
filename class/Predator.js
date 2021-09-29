const LivingCreature = require("./LivingCreature");
var random = require("./random.js");

module.exports = class Predator extends LivingCreature{
    constructor(x, y, id) {
        super(x,y,id)
        this.energy = 5;
        this.getNewCord()
    }
    getNewCord() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        this.getNewCord()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        var empCells = this.chooseCell(0)
        var nwCell = random(empCells)
        if (this.energy >= 8 && nwCell) {
            matrix[nwCell[1]][nwCell[0]] = this.id
            var nwPred = new Predator(nwCell[0], nwCell[1], this.id)
            predArr.push(nwPred)
            matrix[nwCell[1]][nwCell[0]] = this.id
            this.energy = 8
        }
    }
    move() {
        var emptCell = this.chooseCell(0)
        var newCell = random(emptCell)
        if (this.energy > 0 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = this.id

            this.x = newX
            this.y = newY
            this.energy--
        }
    }
    eat() {
        var emptCell = this.chooseCell(2)
        var newCell = random(emptCell)
        if (newCell && this.energy > 0) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[this.y][this.x] = 0
            matrix[newY][newX] = this.id

            this.x = newX
            this.y = newY
            this.energy++
            for(var i in fireArr){
                if(fireArr[i].x == this.x && fireArr[i].y == this.y){
                    fireArr.splice(i,1)
                    break
                }
            }
            this.mul()
        }else {
            this.move()
        }
        if (random(this.chooseCell(0)) == undefined){
            if (matrix[this.y][this.x] != undefined){
                matrix[this.y][this.x] = 0
            }
            for(var i in predArr){
                if(predArr[i].x == this.x && predArr[i].y == this.y){
                    predArr.splice(i,1)
                    break
                }
            }
        }
        this.die()
    }
    die() {
        if(this.energy <= 0){
            matrix[this.y][this.x] = 0
            for(var i in predArr){
                if(predArr[i].x == this.x && predArr[i].y == this.y){
                    predArr.splice(i,1)
                    break
                }
            }
        }
    }
}
