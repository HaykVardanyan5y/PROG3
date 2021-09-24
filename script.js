var mapsize = 620
var mapLen = 35
var side = mapsize / mapLen


function setup() {
    matrix = generateMatrix(mapLen)
    grassArr = []
    fireArr = []
    predArr = []
    bombArr = []
    DEFArr = []

    createCanvas(mapLen * side + 1, mapLen * side + 1)
    background("gray")
    frameRate(20)

    creatObj()
}

function draw() {
    for (var i = 0; i < mapLen; i++) {
        for (var j = 0; j < mapLen; j++) {
            if (matrix[i][j] == 0) {
                fill("gray")
                rect(j * side, i * side, side, side)
            }
            if (matrix[i][j] == 1) {
                fill("green")
                rect(j * side, i * side, side, side)
            }
            if (matrix[i][j] == 2) {
                fill("yellow")
                rect(j * side, i * side, side, side)
            }
            if (matrix[i][j] == 3) {
                fill("red")
                rect(j * side, i * side, side, side)
            }
            if (matrix[i][j] == 4) {
                fill(52, 235, 155)
                rect(j * side, i * side, side, side)
            }
            if (matrix[i][j] == 5) {
                fill(30, 0, 59)
                rect(j * side, i * side, side, side)
            }
        }
    }
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