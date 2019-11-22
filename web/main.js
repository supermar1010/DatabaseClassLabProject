let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let app = express();
let routes = require('./routes');
let auth = require('./auth');


function start() {
    app.use(bodyParser.urlencoded({extended: true, limit: "50MB"}));
    app.use(bodyParser.json({limit: "50MB"}));
    app.use(cookieParser());
    app.use(auth.checkJWT);
    auth.accessConfig({
        "0": ["/", "/index.html", "/api/login", "/api/signUp"],
        "1": ["/api/uploadFiles"],
        "2": []
    });
    app.use(routes);
    const server = app.listen(8080, function () {
        const port = server.address().port;
        console.log('Server listening at http://localhost:' + port);
    })
}

module.exports = {start};
