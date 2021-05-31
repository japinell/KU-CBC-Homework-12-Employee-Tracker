//
//  Department class
//
class Department {
  //
  // Constructor
  //
  constructor(name, id) {
    this.name = name;
    this.id = id;
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
  getRole() {
    return "E";
  }
}

module.exports = { Department };
