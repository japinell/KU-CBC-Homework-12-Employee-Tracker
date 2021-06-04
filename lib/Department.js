//
//  Department class
//
class Department {
  //
  create(values) {
    //
    const { name } = values;
    const sql = "INSERT INTO departments (name) VALUES (?)";
    //
    this.conn.query(sql, name, (err, result) => {
      //
      if (err) {
        //
        console.log(`Error: ${err}`);
        throw err;
        //
      } else {
        //
        console.log(
          result.affectedRows
            ? "\n\nDepartment created successfully!"
            : `\n\nNo records created; database response: ${result.message}`
        );
        //
      }
      //
    });
    //
  }
  //
  retrieve(values) {
    //
    const sql = "SELECT * FROM departments WHERE ?";
    //
    this.conn.query(sql, [values], (err, result) => {
      //
      if (err) {
        //
        console.log(`Error: ${err}`);
        throw err;
        //
      } else {
        //
        console.table(result);
        console.log(
          result.length
            ? "\n\nDepartment selected successfully!"
            : `\n\nNo records selected; database response: ${result.message}`
        );
        //
      }
      //
    });
    //
  }
  //
  update(setObj, whereObj) {
    //
    const sql = "UPDATE departments SET ? WHERE ?";
    //
    this.conn.query(sql, [setObj, whereObj], (err, result) => {
      //
      if (err) {
        //
        console.log(`Error: ${err}`);
        throw err;
        //
      } else {
        //
        console.log(
          result.affectedRows
            ? "\n\nDepartment updated successfully!"
            : `\n\nNo records updated; database response: ${result.message}`
        );
        //
      }
      //
    });
    //
  }
  //
  delete(answers) {
    //
    const sql = "DELETE FROM departments WHERE ?";
    //
    this.conn.query(sql, answers, (err, result) => {
      //
      if (err) {
        //
        console.log(`Error: ${err}`);
        throw err;
        //
      } else {
        //
        console.log(
          result.affectedRows
            ? "\n\nDepartment deleted successfully!"
            : `\n\nNo records deleted; database response: ${result.message}`
        );
        //
      }
      //
    });
    //
  }
  //
}
//
module.exports = { Department };
