let mysql = require('mysql');
let fs = require('fs');
let studentDbTesting = require('./studentDbTesting');
let con;

function start() {
    con = mysql.createConnection({
        host: "localhost",
        user: "group13",
        password: "12345678",
        multipleStatements: true
    });

    con.connect(async function (err) {
        if (err) {
            throw err;
        }
        console.log("Connected");
        let sql = "Create Database IF NOT EXISTS group13_production";
        await con.query(sql, (err, result) => {
            if (err) throw err;
            console.log("Created db");
        });

        await con.changeUser({database: 'group13_production'}, err => {
            if (err) throw err;
        });
        initDb();
    });
}

function initDb() {
    let sql = fs.readFileSync("./sql/initDb.sql", "utf-8");
    con.query(sql, function (err, result) {
        if (err) throw err;

    });
}

function saveFileToDb(file) {
    if (con.isConnected) {
        // Do stuff
    }
}

function checkCredentials(username, password, callback) {
    // result.length > 0
    let sql = `Select id from User where name = ${con.escape(username)} and pwd=${con.escape(password)}`
    con.query(sql, function (err, result) {
        if (err) throw err;
        callback(result.length > 0);
    });
}

module.exports = {start, saveFileToDb, checkCredentials};
