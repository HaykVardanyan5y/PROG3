var Grass = require("./class/Grass.js");
var Fire = require("./class/Fire.js");
var Bomb = require("./class/Bomb.js");
var Predator = require("./class/Predator.js");
var Deffend = require("./class/Deffend.js");
var random = require("./class/random.js");



var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('in.html');
});
server.listen(3000);
///     SCRIPT.JS

var mapLen = 35

matrix = generateMatrix(mapLen)
grassArr = []
fireArr = []
predArr = []
bombArr = []
DEFArr = []

weatherArr = ["winter","spring","summer","hutumn"]

function generateMatrix(mapLenn) {
    var dasht = []
    for (var i = 0; i <= mapLenn; i++) {
        dasht[i] = []
        for (var j = 0; j <= mapLenn; j++) {
            var rndID = random(100)
            if (rndID < 60) {
                dasht[i][j] = 1
            } else if (rndID < 70) {
                dasht[i][j] = 2
            } else if (rndID < 75) {
                dasht[i][j] = 3
            } else {
                dasht[i][j] = 0
            }
        }
    }
    return dasht
}



function creatObj() {
    for (var y = 0; y < mapLen; y++) {
        for (var x = 0; x < mapLen; x++) {
            if (matrix[y][x] == 1) {
                var nwGrass = new Grass(x, y, 1)
                grassArr.push(nwGrass)
            }
            if (matrix[y][x] == 2) {
                var nwFire = new Fire(x, y, 2)
                fireArr.push(nwFire)
            }
            if (matrix[y][x] == 3) {
                var nwPred = new Predator(x, y, 3)
                predArr.push(nwPred)
            }
        }
    }
}

creatObj()


function game() {
    ////// ----------   weather    ----------/////

    weather = random(weatherArr)


    // grass spawn
    if (grassArr.length == 0) {
      var nwGrass = new Grass(Math.floor(random(mapLen)), Math.floor(random(mapLen)), 1)
      grassArr.push(nwGrass)
    }
    //  fire spawn
    if (grassArr.length >= (matrix.length * 6) && fireArr.length < 1) {
      var nwFire = new Fire(Math.floor(random(mapLen)), Math.floor(random(mapLen)), 2)
      fireArr.push(nwFire)
    }
    //  predator spawn
    if (fireArr.length >= 20 && predArr.length == 0) {
      var nwPred = new Predator(Math.floor(random(mapLen)), Math.floor(random(mapLen)), 3)
      predArr.push(nwPred)

      // bomb spawn
      var nwBomb = new Bomb(Math.floor(random(mapLen)), Math.floor(random(mapLen)), 5)
      bombArr.push(nwBomb)
    }
    if (fireArr.length >= 20 && predArr.length == 5) {
      var nwBomb = new Bomb(Math.floor(random(mapLen)), Math.floor(random(mapLen)), 5)
      bombArr.push(nwBomb)
    }
    if (fireArr.length >= 20 && predArr.length == 10) {
      var nwBomb = new Bomb(Math.floor(random(mapLen)), Math.floor(random(mapLen)), 5)
      bombArr.push(nwBomb)
    }
    // DEF spawn
    if (fireArr.length >= 100 && DEFArr.length < 2) {
      var nwDEF = new Deffend(Math.floor(random(mapLen)), Math.floor(random(mapLen)), 4, Math.ceil(random(5)))
      DEFArr.push(nwDEF)
    }

    //---------------------------------------//

    for (var i in grassArr) {
      grassArr[i].mul();
    }
    for (var i in fireArr) {
      fireArr[i].eat();
    }
    for (var i in predArr) {
      predArr[i].eat();
    }
    for (var i in bombArr) {
      bombArr[i].run();
    }
    for (var i in DEFArr) {
      DEFArr[i].run();
    }

    //---------------------------------------//
    // for(var i = 0;i <= matrix.lenght ;i++){
    //   for(var j = 0;j <= matrix[i].lenght ;i++){
    //     if (matrix[i][j] == 1) {
    //         grass_count++
    //     }
    //   }
    // }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: fireArr.length,
        predatorCounter: predArr.length,
        bombCounter: bombArr.length,
        defCounter: DEFArr.length,
        weather: weather
    }
    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}
setInterval(game, 250)
