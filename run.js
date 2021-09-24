var express = require("express");
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Grass = require("./class/Grass.js");
var Fire = require("./class/Fire.js");
var Predator = require("./class/Predator.js");
var Deffend = require("./class/Deffend.js");
var random = require("./class/random.js");


var app = express();

app.use(express.static("../PROG3"));


app.get("/", function (req, res) {
    res.redirect("./in.html");
});
app.listen(3000, function () {
    console.log("all ok")
});


///     SCRIPT.JS

var mapsize = 620
var mapLen = 35
var side = mapsize / mapLen

matrix = generateMatrix(mapLen)
grassArr = []
fireArr = []
predArr = []
bombArr = []
DEFArr = []
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


function generateMatrix(mapLenn) {
    var matrix = []
    for (var i = 0; i <= mapLenn; i++) {
        matrix[i] = []
        for (var j = 0; j <= mapLenn; j++) {
            var rndID = random(100)
            if (rndID < 60) {
                matrix[i][j] = 1
            } else if (rndID < 70) {
                matrix[i][j] = 2
            } else if (rndID < 75) {
                matrix[i][j] = 3
            } else {
                matrix[i][j] = 0
            }
        }
    }
    return matrix
}


function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (fireArr[0] !== undefined) {
        for (var i in fireArr) {
            fireArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        // grassCounter: grassHashiv
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}

setInterval(game, 16)