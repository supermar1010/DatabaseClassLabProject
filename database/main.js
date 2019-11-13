let mysql = require('mysql');
let studentDbTesting = require('./studentDbTesting');
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

function saveFileToDb(file){
    if(con.isConnected){
        // Do stuff
    }
}

module.exports = {start, saveFileToDb};
