var fs = require("fs");


class DataStructure {
    constructor(bool) {
        this.browser = generateBrowser();
        this.version = generateVersion();
        this.os = generateOS();
        this.ipv6 = generateIpV6();
        this.req = bool?generateNormalURL():generateBadURL();
        this.timestamp = generateTimeStamp();
    }
}


function generateIpV6() {
    var result = "";
    for (let i = 0; i < 8; i++) {
        result += generate4Base16();
    }
    result = result.substr(0, result.length - 1);
    return result;
}

function generateBrowser() {
    var array = ["Safari", "Opera", "Mozilla Firefox", "Google Chrome", "Brave", "Microsoft Edge", "Torch"]
    var rand = Math.floor(Math.random() * array.length);
    return array[rand];
}

function generateVersionPart(len) {
    var result = "" + (1 + Math.floor(Math.random() * 8));
    for (let i = 1; i < len; i++) {
        result += Math.floor(Math.random() * 9);
    }
    return result;
}

function generateVersion() {
    var result = "";
    result += generateVersionPart(2) + ".";
    result += generateVersionPart(1) + ".";
    result += generateVersionPart(4) + ".";
    result += generateVersionPart(2);
    return result;
}

function generateOS() {
    var array = ["Windows XP", "Windows 8.0", "Windows 7.0", "Windows 10.0", "macOS", "Android OS", "iOS", "Linux", "ubuntu"];
    var rand = Math.floor(Math.random() * array.length);
    return array[rand];
}

function generateTimeStamp() {
    const timestamp = (new Date()).getTime();
    return timestamp + Math.floor(Math.random() * 500000);
}

function generateProtocole() {
    var array = ["https", "https", "https", "http"];
    var rand = Math.floor(Math.random() * array.length);
    return array[rand];
}

function generateNormalURL() {
    var array = ["/myAccount", "/", "/about", "/settings", "/messages", "/support", "/forum"];
    var rand = Math.floor(Math.random() * array.length);
    return array[rand];
}
function generateBadURL() {
    var array = ["/Admin", "/data", "/config", "/env", "/dashboard", "/test", "/adminpannel"];
    var rand = Math.floor(Math.random() * array.length);
    return array[rand];
}

function generate4Base16() {
    var array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var result = "";
    for (let i = 0; i < 4; i++) {
        var rand = Math.floor(Math.random() * array.length);
        result += array[rand];
    }
    result += ":";
    return result;
}
var data = [];
for (let i = 0; i < 50; i++) {
    data.push(new DataStructure(true))
}
for (let i = 0; i < 2; i++) {
    data.push(new DataStructure(false))
}
for (let i = 0; i < 50; i++) {
    data.push(new DataStructure(true))
}
fs.writeFile('generated.json', JSON.stringify(data), function (err) {
    if (err) return console.log(err);
    console.log('Writing data : done');
});
