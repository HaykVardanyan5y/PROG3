var mapsize = 620
var mapLen = 35
var side = 15

var socket = io()

function creatobject(event) {
    x = Math.floor((event.clientX/15)-0.6)
    y = Math.floor((event.clientX/15)-0.6)
    var clickSize = document.getElementById("clickSize").value;
    var char = document.getElementById("char");
    var char2 = document.getElementById("char2");
    var char3 = document.getElementById("char3");
    var char4 = document.getElementById("char4");
    var char5 = document.getElementById("char5");

    var clickMod = 0;

    if (char.checked){
      switch (clickSize) {
          case 1:
              var clickMod = new Predator(x, y, 3);
              predArr.push(clickMod)
              break;
          case 2:
              var clickMod = new Predator(x, y, 3);
              predArr.push(clickMod)
              break;
      }
    }
}

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
        grassCounter.innerText = data.grassCounter.length;
        grassEaterCounter.innerText = data.grassEaterCounter

        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)

        var fragment = document.createDocumentFragment();
        fragment.appendChild(document.getElementById('defaultCanvas0'));
        document.getElementById('menu').appendChild(fragment);

        document.getElementById("defaultCanvas0").style.order = 1

        var charSize = document.getElementById("clickSize").value;
        document.getElementById("rngvalue").innerHTML = charSize;


        document.getElementById('defaultCanvas0').addEventListener("click", creatobject)

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
