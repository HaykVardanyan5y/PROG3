class Bomb {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.energy = 2
        this.directions = []
    }
    run() {
        // directions Bomb
        for (var i = 0; i < dasht.length; i++) {
            if (i % 6 == 2 || i % 6 == 3) {
                if (this.y - 1 < dasht.length && this.y - 1 >= 0) {
                    this.directions.push([i, this.y - 1])
                }
            }
            else if (i % 6 == 5) {
                if (this.y + 1 < dasht.length && this.y + 1 >= 0) {
                    this.directions.push([i, this.y + 1])
                }
            } else {
                this.directions.push([i, this.y])
            }
        }
        for (var j = 0; j < dasht.length; j++) {
            if (j % 7 == 1 || j % 7 == 2) {
                if (this.x - 1 < dasht.length - 1 && this.x - 1 >= 0) {
                    this.directions.push([this.x - 1, j])
                }
            }
            else if (j % 7 == 4 || j % 7 == 6) {
                if (this.x - 1 < dasht.length - 1 && this.x - 1 >= 0) {
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
            dasht[newY][newX] = this.id
        }
    }
    die() {
        if (this.energy <= 0) {
            for (var i in bombArr) {
                if (bombArr[i].x == this.x && bombArr[i].y == this.y) {
                    bombArr.splice(i, 1)
                    break
                }
            }
            for (var i in this.directions) {
                var newX = this.directions[i][0]
                var newY = this.directions[i][1]
                dasht[newY][newX] = 0
            }
        }
        this.energy--
    }
}

