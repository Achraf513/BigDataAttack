const express = require("express");
var fs = require('fs');
const app = express();
app.use(express.static("./public"));
app.use(require('express-useragent').express())

app.listen(process.env.port || 3000);
console.log('Running at Port 3000');

var userData = [];

fs.readFile('./data.json', 'utf8', function (err, stuff) {
    if (err) throw err;
    userData = JSON.parse(stuff);
});


app.use(function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    const timestamp = (new Date()).getTime();
    useragent = {
        browser: req.useragent.browser,
        version: req.useragent.version,
        os: req.useragent.os,
        platform: req.useragent.platform,
        ip: ip,
        req: req.url,
        protocol: req.protocol,
        timestamp: timestamp
    }
    userData.push(useragent);
    next();
});

app.get("/", (req, res) => {
    res.sendFile("./public/index.html")
})

app.get("/data", (req, res) => {
    res.send(userData)
})

