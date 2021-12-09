const express = require("express");
var fs = require('fs');
const app = express();
app.use(express.static("./public"));
app.use(require('express-useragent').express())

app.listen(5500);
console.log('Running at Port 5500');





app.get("/data", (req, res) => {
    var userData = [];
    fs.readFile('./data.json', 'utf8', function (err, stuff) {
        if (err) throw err;
        userData = JSON.parse(stuff);
        res.send(userData);
    });
})
app.get("/dataFrequency", (req, res) => {
    fs.readFile('./c_data.json', 'utf8', function (err, stuff) {
        if (err) throw err;
        let dataToSend = JSON.parse(stuff);
        res.send(dataToSend);
    });
})