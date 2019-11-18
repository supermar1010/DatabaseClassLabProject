let fs = require('fs');

function insertNewStudent(con) {
    let sql = "insert into student(ID, name, dept_name, tot_cred) VALUES(53534, \"Jonas Schrader\", \"Finance\", 86);";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
}

function queryNewStudent(con) {
    let sql = "Select * from student where id = 53534";
    con.query(sql, function (err, result) {
        if (err) throw err;
        let name = result[0].name;
        console.log("name: " + name);
    });
}

function deleteById(con, id) {
    let sql = `DELETE FROM student WHERE id = ${con.escape(id)}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result[0]);
    });
}

function createStudentTable(con) {
    let sql = fs.readFileSync("./sql/createStudentDatabase.sql", "utf8");
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
}


module.exports = {insertNewStudent, queryNewStudent, deleteById, createStudentTable};
