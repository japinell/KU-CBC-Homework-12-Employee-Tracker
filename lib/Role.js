//
//  Role class
//
class Role {
  //
  // Constructor
  //
  constructor(title, id, salary, dept_id) {
    this.title = title;
    this.id = id;
    this.salary = salary;
    this.dept_id = dept_id;
  }
  //
  // Methods
  //
  getTitle() {
    return this.title;
  }
  getId() {
    return this.id;
  }
  getSalary() {
    return this.salary;
  }
  getDeptId() {
    return this.dept_id;
  }
  getRole() {
    return "R";
  }
}

module.exports = { Role };
