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
  createDepartment() {
    //
    this.conn.query(
      "INSERT INTO departments (name) VALUES (?)",
      [this.name],
      (err) => {
        //
        if (err) throw err;
        //
        console.log("Department created successfully!");
        //
      }
    );
    //
  }
}

module.exports = { Department };
