//
//  Department class
//
class Department {
  //
  // Constructor
  //
  constructor(name) {
    this.name = name;
  }
  //
  // Methods
  //
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  insert() {
    //
    this.conn.query(
      "INSERT INTO departments (name) VALUES (?)",
      [this.name],
      (err) => {
        //
        if (err) {
          //
          console.log(`Error: ${err}`);
          throw err;
          //
        } else {
          //
          console.log("Department created successfully!");
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
Department.prototype.delete = (whereCond) => {
  //
  Department.prototype.conn.query(
    "DELETE FROM departments WHERE ?",
    whereCond,
    (err) => {
      //
      if (err) {
        //
        console.log(`Error: ${err}`);
        throw err;
        //
      } else {
        //
        console.log("Department deleted successfully!");
        //
      }
      //
    }
  );
  //
};

module.exports = { Department };
