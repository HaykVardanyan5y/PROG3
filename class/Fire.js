class Fire extends LivingCreature {
    constructor(x, y, id) {
        super(x,y,index)
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
      return super.chooseCell(character)
    }
    mul() {
        var empCells = this.chooseCell(0)
        var nwCell = random(empCells)
        if (this.energy >= 8 && nwCell) {
            dasht[nwCell[1]][nwCell[0]] = this.id
            var nwFire = new Fire(nwCell[0], nwCell[1], this.id)
            fireArr.push(nwFire)
            dasht[nwCell[1]][nwCell[0]] = this.id
            this.energy = 5
        }
    }
    move() {
        var emptCell = this.chooseCell(0)
        var newCell = random(emptCell)
        if (this.energy > 0 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            dasht[this.y][this.x] = 0
            dasht[newY][newX] = this.id

            this.x = newX
            this.y = newY
            this.energy--
        }
    }
    eat() {
        var emptCell = this.chooseCell(1)
        var newCell = random(emptCell)
        if (this.energy > 0 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]

            dasht[this.y][this.x] = 0
            dasht[newY][newX] = this.id

            this.x = newX
            this.y = newY
            this.energy++
            for(var i in grassArr){
                if(grassArr[i].x == this.x && grassArr[i].y == this.y){
                    grassArr.splice(i,1)
                    break
                }
            }
            this.mul()
        }else {
            this.move()
        }
        this.die()
    }
    die() {
        if(this.energy <= 0){
            dasht[this.y][this.x] = 0
            for(var i in fireArr){
                if(fireArr[i].x == this.x && fireArr[i].y == this.y){
                    fireArr.splice(i,1)
                    break
                }
            }
        }
    }
}
