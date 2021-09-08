class Grass{
    constructor(x, y, id) {
       this.x = x;
       this.y = y;
       this.id = id;
       this.multiply = 0;
       this.directions = [
           [this.x -1 ,this.y-1],
           [this.x ,this.y-1],
           [this.x +1 ,this.y-1],
           [this.x -1 ,this.y],
           [this.x ,this.y],
           [this.x +1 ,this.y],
           [this.x -1 ,this.y+1],
           [this.x ,this.y+1],
           [this.x +1 ,this.y+1]
       ]
    }
    celll(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < dasht[0].length && y >= 0 && y < dasht.length){
                if (dasht[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul(){
        this.multiply++
        var nwCell = random(this.celll(0))
        if(this.multiply >= 8 && nwCell){
            var nwGrass = new Grass(nwCell[0],nwCell[1],this.id)
            grassArr.push(nwGrass)
            dasht[nwCell[1]][nwCell[0]] = this.id
            this.multiply = 0
        }
    }
}
