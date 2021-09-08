class Fire {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.multiply = 0;
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
    celll(character) {
        this.getNewCord()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < dasht[0].length && y >= 0 && y < dasht.length) {
                if (dasht[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        var empCells = this.celll(0)
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
        var emptCell = this.celll(0)
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
        var emptCell = this.celll(1)
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
