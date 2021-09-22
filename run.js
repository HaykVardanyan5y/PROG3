var express = require("express");
var app = express();

app.use(express.static("../PROG3"));


app.get("/", function (req, res) {
    res.redirect("./in.html");
});
app.listen(3000, function () {
    console.log("all ok")
});
