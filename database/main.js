let mysql = require('mysql');
let fs = require('fs');
let studentDbTesting = require('./studentDbTesting');
let config = require('../config');
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
        await con.query(sql, (err) => {
            if (err) throw err;
            console.log("Created db");
        });

        await con.changeUser({database: 'group13_production'}, err => {
            if (err) throw err;
        });
        initDb();
    });
}

function saveFile(file){
    // if(con.isConnected){
        if(file.size > config.bigFileThreshold){
            console.log('This file is a big file');
            fs.writeFile(`data/${file.name}`, file.content, 'base64', (err) => console.error(err))
        }
        else {
            console.log('This file is a small file');
        }
    // }
}

function initDb() {
    let sql = fs.readFileSync("./sql/initDb.sql", "utf-8");
    con.query(sql, function (err) {
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
    let sql = `Select id from User where name = ${con.escape(username)} and pwd=${con.escape(password)}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        callback(result.length > 0);
    });
}

function isUsernameUsed(username, callback) {
    // result.length > 0
    let sql = `Select id from User where name = ${con.escape(username)}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        callback(result.length > 0);
    });
}

function signUp(username, password, callback) {
    let sql = `insert into User(name, pwd, is_admin) Values (${con.escape(username)}, ${con.escape(password)}, 0);`;
    con.query(sql, err => {
        if (err) {
            callback(false);
            throw err;
        } else {
            callback(true);
        }
    });
}

module.exports = {start, saveFile, checkCredentials, isUsernameUsed, signUp};
