//
//  Department class
//
//const mysql = require("mysql");
//
class Department {
  //
  select(values) {
    const sql = "SELECT name, id FROM departments WHERE ?";
    this.conn.query(sql, values, (err, results) => {
      if (err) throw err;
      console.table(results);
    });
  }
  //
  insert(values) {
    const { name } = values;
    const sql = "INSERT INTO departments (name) VALUES (?)";
    this.conn.query(sql, name, (err, result) => {
      if (err) throw err;
      console.log(
        result.affectedRows
          ? "\n\nDepartment created successfully!"
          : `\n\nNo records created - ${result.message}`
      );
    });
  }
  //
  update(setObj, whereObj) {
    const sql = "UPDATE departments SET ? WHERE ?";
    this.conn.query(sql, [setObj, whereObj], (err, result) => {
      if (err) throw err;
      console.log(
        result.affectedRows
          ? "\n\nDepartment updated successfully!"
          : `\n\nNo records updated - ${result.message}`
      );
    });
  }
  //
  delete(answers) {
    const sql = "DELETE FROM departments WHERE ?";
    this.conn.query(sql, answers, (err, result) => {
      if (err) throw err;
      console.log(
        result.affectedRows
          ? "\n\nDepartment deleted successfully!"
          : `\n\nNo records deleted - ${result.message}`
      );
    });
  }
}
//
module.exports = { Department };
//
