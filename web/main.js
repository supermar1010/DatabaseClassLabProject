let express = require('express');
let app = express();
let routes = require('./routes');
let bodyParser = require('body-parser');


function start() {
    app.use(bodyParser.urlencoded({ extended: true, limit: "50MB" }));
    app.use(bodyParser.json({limit: "50MB"}));
    app.use(routes);
    const server = app.listen(8080, function () {
        const port = server.address().port;
        console.log('Server listening at http://localhost:' + port);
    })
}

module.exports = {start};
