var Grass = require("./class/Grass.js");
var Fire = require("./class/Fire.js");
var Lighting = require("./class/Lighting.js");
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
LightingArr = []
DEFArr = []

var mullt = 8
var weatherArr = ["winter","spring","summer","hutumn"]
var weather = random(weatherArr)

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

mullc = 8
timeOut = 0

function game() {
    ////// ----------   weather    ----------/////
    timeOut++
    if(timeOut >= 20){
      if (weather == "winter") {
        weather = "spring"
      }
      if (weather == "spring") {
        weather = "summer"
      }
      if (weather == "summer") {
        weather = "hutumn"
      }
      if (weather == "hutumn") {
        weather = "winter"
      }
        timeOut = 0
    }


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

    }
    // DEF spawn
    if (fireArr.length >= 100 && DEFArr.length < 2) {
      var nwDEF = new Deffend(Math.floor(random(mapLen)), Math.floor(random(mapLen)), 4, Math.ceil(random(5)))
      DEFArr.push(nwDEF)
    }

    //   weather

    if (weather == "winter") {
      var bgcolor = "#bdfeff";
      mullc = 8
    }
    if (weather == "spring") {
      var bgcolor = "#cff266";
      mullc = 6
    }
    if (weather == "summer") {
      var bgcolor = "#167002";
      mullc = 7
    }
    if (weather == "hutumn") {
      var bgcolor = "#cff266";
      mullc = 5
    }
    if (weather != "summer") {
      if ((LightingArr.length <= 1 && fireArr.length >= 20) && predArr.length == 0 ) {
        var nwLighting = new Lighting(Math.floor(random(mapLen)), Math.floor(random(mapLen)), 5)
        LightingArr.push(nwLighting)
      }
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
    for (var i in LightingArr) {
      LightingArr[i].run();
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
        LightingCounter: LightingArr.length,
        defCounter: DEFArr.length,
        weather: weather,
        bgcolor: bgcolor
    }
    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
    module.exports.mull =  mullt ;
}
setInterval(game, 500)
