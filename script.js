var mapsize = 620
var mapLen = 35
var side = mapsize / mapLen

function setup() {
    var socket = io()
    matrix = []

    // let tabble = document.GetElementById("tabl");
    let grassCounter = document.getElementById("grassCount");
    // let grassCounter_die = document.GetElementById("tabl");
    // let fireCounter = document.GetElementById("tabl");
    // let predatorCounter = document.GetElementById("tabl");

    socket.on("data", drawCreatures);

    ////-----------------------------------------------////

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassArr = data.grassArr,
        fireArr = data.fireArr,
        predArr = data.predArr,
        bombArr = data.bombArr,
        DEFArr = data.DEFArr,
        grassCounter.innerText = data.grassCounter;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * mapLen, matrix.length * mapLen)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

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
        // for (var i in grassArr) {
        //   grassArr[i].mul();
        // }
        // for (var i in fireArr) {
        //   fireArr[i].eat();
        // }
        // for (var i in predArr) {
        //   predArr[i].eat();
        // }
        // for (var i in bombArr) {
        //   bombArr[i].run();
        // }
        // for (var i in DEFArr) {
        //   DEFArr[i].run();
        // }

    }
}
