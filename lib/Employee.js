//
//  Employee class
//
class Employee {
  //
  // Constructor
  //
  constructor(first_name, last_name, id, role_id, manager_id) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.id = id;
    this.role_id = role_id;
    this.manager_id = manager_id;
  }
  //
  // Methods
  //
  getFirstName() {
    return this.first_name;
  }
  getLastName() {
    return this.last_name;
  }
  getId() {
    return this.id;
  }
  getRoleId() {
    return this.role_id;
  }
  getManagerId() {
    return this.manager_id;
  }
  getRole() {
    return "E";
  }
}

module.exports = { Employee };
