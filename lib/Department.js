//
//  Department class
//
class Department {
  //
  insert(answers) {
    //
    console.log(answers);
    const { deptName } = answers;
    console.log(deptName);
    //
    this.conn.query(
      "INSERT INTO departments (name) VALUES (?)",
      deptName,
      (err, result) => {
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
              : `\n\nNo records affected; database response: ${result.message}`
          );
          //
        }
        //
      }
    );
    //
  }
  //
  delete(answers) {
    //
    this.conn.query(
      "DELETE FROM departments WHERE ?",
      answers,
      (err, result) => {
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
              : `\n\nNo records affected; database response: ${result.message}`
          );
          //
        }
        //
      }
    );
    //
  }
  //
}
//
module.exports = { Department };
