const express = require("express");
const { spawn } = require('child_process');
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

async function collectData(req, res) {
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
    return await checkForAnomaly(useragent, res)
}

app.get("/myAccount", (req, res) => {
    res.sendFile("myAccount.html", { root: __dirname + "/public" });
    collectData(req);
})
app.get("/support", (req, res) => {
    res.sendFile("support.html", { root: __dirname + "/public" });
    collectData(req);
})
app.get("/about", (req, res) => {
    res.sendFile("About.html", { root: __dirname + "/public" });
    collectData(req);
})
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname + "/public" });
    collectData(req);
})
app.get("/dataLast", (req, res) => {
    res.send(JSON.stringify(userData[userData.length - 1]));
})
var routes = ["/myAccount", "/support", "/"]

app.all('*', function (req, res) {
    if (req.url != "/favicon.ico") collectData(req, res)
    if (!routes.includes(req.url)) {
        res.sendFile('niceTry.html', { root: __dirname + "/public" });
    }
})


async function checkForAnomaly(json, res) {
    var dataToSend
    const python = spawn('python', ['model.py', JSON.stringify(json)]);
    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
        dataToSend = dataToSend.split(":")[1]
    });
    python.on('close', (code) => {
        if (dataToSend?.trim() != "True") {
            userData.push(json)
            let data = JSON.stringify(userData);
            fs.writeFileSync('data.json', data);
        }
    });
}