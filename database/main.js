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

function initDb() {
    let sql = fs.readFileSync("./sql/initDb.sql", "utf-8");
    con.query(sql, function (err) {
        if (err) throw err;
    });
}

function saveFile(file) {
    let userId;
    let sqlUser = `select ID from User where name = "${con.escape(file.user)}"`;
    con.query(sqlUser, function (err, result) {
        if (err) throw err;
        userId = result[0].ID;
    });

    let sqlInsertFile = "";
    if (file.size > config.bigFileThreshold) {
        console.log('This file is a big file');
        sqlInsertFile = `insert into File(file_content, file_location) VALUES(null, "${con.escape(file.name)}");`;
        writeFileToHarddisk(file);
    } else {
        console.log('This file is a small file');
        sqlInsertFile = `insert into File(file_content, file_location) VALUES("${con.escape(file.content)}", "${con.escape(file.name)}");`;
    }

    con.query(sqlInsertFile, function (err, result) {
        if (err) throw err;
        let fileId = result.insertId;
        console.log("fileId: " + fileId);
        let sqlInsertMetadata = `insert into MetaData(file_size, date_added, number_of_updates, user_ID, file_ID) 
                Values(${con.escape(file.size)}, ${con.escape(file.lastModified)}, 0, ${userId}, ${fileId} );`;
        con.query(sqlInsertMetadata, function (err, result) {
            if (err) throw err;
        })
    });
}

function writeFileToHarddisk(file) {
    let dir = 'data';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFile(`data/${file.name}`, file.content, 'base64', (err) => console.error(err))
}

function checkCredentials(username, password, callback) {
    let sql = `Select is_admin from User where name = ${con.escape(username)} and pwd=${con.escape(password)}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            if (result[0].is_admin === 1) {
                callback(2);
            } else {
                callback(1);
            }
        } else {
            callback(0);
        }
    });
}

function isUsernameUsed(username, callback) {
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
