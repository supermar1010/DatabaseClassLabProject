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
        database: "group13_production",
        multipleStatements: true
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected");
        studentDbTesting.createStudentTable(con);
        studentDbTesting.deleteById(con, 53534);
        studentDbTesting.insertNewStudent(con);
        studentDbTesting.queryNewStudent(con);
        studentDbTesting.deleteById(con, 53534);

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

module.exports = {start, saveFile};
