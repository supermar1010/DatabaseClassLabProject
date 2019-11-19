let path = require('path');
let secret = "secret";
let jwt = require('jsonwebtoken');
let database = require("../database/main");

async function serveStaticFiles(req, res) {
    res.sendFile(path.resolve('./html/index.html'));
}

async function serveAxios(req, res) {
    res.sendFile(path.resolve("/home/mario/.WebStorm2019.2/config/javascript/extLibs/http_unpkg.com_axios_dist_axios.js"));
}

async function uploadFiles(req, res) {
    console.log("Upload files");
    let name = req.body.name;
    // This is base64 encoded can be written to harddisk like this: fs.writeFile("out.png", base64Data, 'base64', (err) => console.error(err))
    let content = req.body.content;
    let lastModified = req.body.lastModified;
    let file = new File(name, content.split(',')[1], lastModified);
    console.log(file);
    res.send();
}

async function signUp(req, res) {

}

function login(req, res) {
    database.checkCredentials(req.body.username, req.body.password, (result) => {
        if (result) {
            console.log("login successful");
            let token = jwt.sign({username: req.body.username}, secret);
            console.log(token);
            res.send({token: token});
        } else {
            res.status(403);
            res.send({error: "Invalid"});
        }
    });
}

function isUserAdmin(username) {

}

class File {
    constructor(name, content, lastModified, user) {
        this.name = name;
        this.content = content;
        this.lastModified = lastModified;
        this.user = user;
    }
}

module.exports = {serveStaticFiles, uploadFiles, File, signUp, login, serveAxios};
