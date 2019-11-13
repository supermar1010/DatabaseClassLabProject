let mysql = require('mysql');
let fs = require('fs');

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
        // createStudentTable();
        // deleteById(53534);
        // insertNewStudent();
        // queryNewStudent();
        // deleteById(53534);
    });
}

function insertNewStudent() {
    let sql = "insert into student(ID, name, dept_name, tot_cred) VALUES(53534, \"Jonas Schrader\", \"Finance\", 86);";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
}

function queryNewStudent() {
    let sql = "Select * from student where id = 53534";
    con.query(sql, function (err, result) {
        if (err) throw err;
        let name = result[0].name;
        console.log("name: " + name);
    });
}

function deleteById(id) {
    let sql = `DELETE FROM student WHERE id = ${con.escape(id)}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result[0]);
    });
}

function createStudentTable() {
    let sql = fs.readFileSync("./sql/createStudentDatabase.sql", "utf8");
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
}

module.exports = {start};
