var mapsize = 620
var mapLen = 35
var side = 15

var socket = io()
var bombArr = []

function setup() {
  matrix = []
  let grassCounter = document.getElementById("grassCount");
  let grassEaterCounter = document.getElementById("grassEaterCount");
  let predatorCounter = document.getElementById("predatorCount");
  let defCounter = document.getElementById("defCount");
  let lightingCounter = document.getElementById("lightingCount");


  socket.on("data", drawCreatures);

  ////-----------------------------------------------////

  function drawCreatures(data) {
    //! after getting data pass it to matrix variable
    matrix = data.matrix;
    weather = data.weather;
    grassCounter.innerText = data.grassCounter;
    grassEaterCounter.innerText = data.grassEaterCounter
    predatorCounter.innerText = data.predatorCounter;
    defCounter.innerText = data.defCounter
    lightingCounter.innerText = data.LightingCounter;

    //! Every time it creates new Canvas woth new matrix size
    createCanvas(matrix[0].length * side, matrix.length * side)
    //! clearing background by setting it to new grey color
    background(data.bgcolor);

    /////////// mouse event fail  (((

    document.getElementById("grass").style.backgroundColor = data.bgcolor
    for (var i in bombArr) {
      bombArr[i].spawn();
    }
    //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j] == 0) {
          fill("gray")
          rect(j * side, i * side, side, side)
        }
        if (matrix[i][j] == 1) {
          fill(data.bgcolor)
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
          fill(36, 144, 145)
          rect(j * side, i * side, side, side)
        }
        if (matrix[i][j] == 5) {
          fill(30, 0, 59)
          rect(j * side, i * side, side, side)
        }
        if (matrix[i][j] == 6) {
          fill(189, 62, 8)
          rect(j * side, i * side, side, side)
        }
      }
    }
  }
}
