let path = require('path');
let config = require("../config");
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
    let size = req.body.size;

    let decoded = jwt.verify(req.cookies.auth, config.secret);
    let file = new File(name, content.split(',')[1], lastModified, decoded.username, size);
    console.log(file);
    res.send();
    database.saveFile(file);
}

async function signUp(req, res) {
    database.isUsernameUsed(req.body.username, (used) => {
        if (!used) {
            database.signUp(req.body.username, req.body.password, (success) => {
                if (success) {
                    res.send({msg: "Success, please sign in"});
                } else {
                    res.status(500);
                    res.send({error: "Something went wrong please try again later"});
                }
            });
        } else {
            res.status(403);
            res.send({error: "Invalid"});
        }
    });
}

function login(req, res) {
    database.checkCredentials(req.body.username, req.body.password, (result) => {
        if (result > 0) {
            console.log("Login successful");
            let token = jwt.sign({username: req.body.username, accessLevel: result}, config.secret);
            console.log(token);
            res.send({token: token});
        } else {
            res.status(403);
            res.send({error: "Invalid"});
        }
    });
}

class File {
    constructor(name, content, lastModified, user, size) {
        this.name = name;
        this.content = content;
        this.lastModified = lastModified;
        this.user = user;
        this.size = size;
    }
}

module.exports = {serveStaticFiles, uploadFiles, File, signUp, login, serveAxios};
