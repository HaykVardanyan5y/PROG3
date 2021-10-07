class Bomb {
  constructor(x, y, id)
  {
     this.x = x;
     this.y = y;
     this.id = id;
     this.multiply = 0;
     this.energy = 50;
     this.directions = [
         [this.x -1 ,this.y-1],
         [this.x ,this.y-1],
         [this.x +1 ,this.y-1],
         [this.x -1 ,this.y],
         [this.x ,this.y],
         [this.x +1 ,this.y],
         [this.x -1 ,this.y+1],
         [this.x ,this.y+1],
         [this.x +1 ,this.y+1],

         [this.x+2 ,this.y-1],
         [this.x+2 ,this.y],
         [this.x+2 ,this.y+1],
         [this.x-2 ,this.y-1],
         [this.x-2 ,this.y],
         [this.x-2 ,this.y+1],
         [this.x-1 ,this.y+2],
         [this.x ,this.y+2],
         [this.x+1 ,this.y+2],
         [this.x-1 ,this.y-2],
         [this.x ,this.y-2],
         [this.x+1 ,this.y-2]

     ]
  }
  die()
  {
    if (this.energy <= 0) {
        for(var i in bombArr){
          if(bombArr[i].x == newX && bombArr[d].y == newY){
            bombArr.splice(i,1)
            break
          }
        }
        for (var i in this.directions) {
            var newX = this.directions[i][0]
            var newY = this.directions[i][1]
            if (newX >= 0 && newX < matrix.length && newY >= 0 && newY < matrix.length) {
                matrix[newY][newX] = 0
            }
        }
    }
    this.energy--
  }
  spawn()
  {
    for (var i in this.directions)
    {
      var newX = this.directions[i][0]
      var newY = this.directions[i][1]
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
      {
        console.log(data.grassArr)
        // for(var a in grassArr){
        //   if(grassArr[a].x == newX && grassArr[a].y == newY){
        //     grassArr.splice(a,1)
        //     break
        //   }
        // }
        // for(var b in fireArr){
        //   if(fireArr[b].x == newX && fireArr[b].y == newY){
        //     fireArr.splice(b,1)
        //     break
        //   }
        // }
        // for(var c in predArr){
        //   if(predArr[c].x == newX && predArr[c].y == newY){
        //     predArr.splice(c,1)
        //     break
        //   }
        // }
        for(var d in LightingArr){
          if(LightingArr[d].x == newX && LightingArr[d].y == newY){
            LightingArr.splice(d,1)
            break
          }
        }
        matrix[newY][newX] = this.id
      }
    }
    this.die()
  }

  // socket.on("data", this.spawn);
}
