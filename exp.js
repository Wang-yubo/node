const express = require("express");
let app = express();
app.get("/", function(req, res, next) {
    res.send("我来截胡了")
}, function(req, res) {
    res.send("执行到底了")
});
app.listen(8080);