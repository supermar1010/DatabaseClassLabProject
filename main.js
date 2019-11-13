let database = require('./database/main');
let web = require('./web/main');

database.start();

web.start();
