let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "group13",
    password: "12345678",
    database: "group13_production"
});

con.connect(function (err) {
    console.log("Connected");
// createDatabase();
// createTestingTable();
// insertTestingStuff();
    insertNewStudent();
    queryAllStudents();
    queryNewStudent();
    deleteById(53533);
    queryAllStudents();
    queryNewStudent();
});


function createDatabase() {
    let sql = "CREATE DATABASE group13_production";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
}

function createTestingTable() {
    let sql = "CREATE TABLE testing";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
}

function insertNewStudent() {
    let sql = "insert into student(ID, name, dept_name, tot_cred) VALUES(53533, \"Jonas Schrader\", \"English\", 86);";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
}

function queryAllStudents() {
    let sql = "Select * from student";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
}

function queryNewStudent() {
    let sql = "Select * from student where id = 53533";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
}

function deleteById(id) {
    let sql = `DELETE FROM student WHERE id = ${con.escape(id)}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
}
