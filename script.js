var mapsize = 620
var mapLen = 35
var side = 15

    var socket = io()
function setup() {
    matrix = []

    // let tabble = document.GetElementById("tabl");
    let grassCounter = document.getElementById("grassCount");
    let grassEaterCounter = document.getElementById("grassEaterCount");
    // let fireCounter = document.GetElementById("tabl");
    // let predatorCounter = document.GetElementById("tabl");

    socket.on("data", drawCreatures);

    ////-----------------------------------------------////

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        weather = data.weather;
        // grassArr = data.grassArr,
        // fireArr = data.fireArr,
        // predArr = data.predArr,
        // bombArr = data.bombArr,
        // DEFArr = data.DEFArr,
        grassCounter.innerText = data.grassCounter;
        grassEaterCounter.innerText = data.grassEaterCounter
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        for (var i = 0; i < matrix.length; i++) {
          for (var j = 0; j < matrix[0].length; j++) {
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


    }
}
