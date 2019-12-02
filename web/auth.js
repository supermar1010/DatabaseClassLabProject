let jwt = require('jsonwebtoken');
let config = require("../config");
let accessConfigList = [];

function accessConfig(list) {
    accessConfigList = list;
}

function checkJWT(req, res, next) {
    let accessLevel;
    try {
        let decoded = jwt.verify(req.cookies.auth, config.secret);
        console.log(decoded);
        accessLevel = decoded.accessLevel;
    } catch (err) {
        console.log(err);
        accessLevel = 0;
    }
    if (checkAccess(accessLevel, req.url)) {
        console.log("Access granted");
        next();
    } else {
        console.log("Access denied");
        let error = {err: "Please login first"};
        res.status(403);
        res.send(error);
    }
}

function checkAccess(accessLevel, url) {
    let access = false;
    for (let i = accessLevel; i >= 0 && !access; i--) {
        access = access || accessConfigList[i].includes(url);
    }
    return access;
}

module.exports = {checkJWT, accessConfig};
