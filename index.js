//
//  Library imports
//
const inquirer = require("inquirer");
const mysql = require("mysql");
//
const { Database } = require("./lib/Database");
//
// Set the connection to the MySql database
//
const config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "cms_db",
  debug: true,
};
//
// Start questions
//
const startQuestions = [
  {
    type: "confirm",
    name: "continue",
    message:
      "\n---------- EMPLOYEE MANAGEMENT SYSTEM ----------\nThe following questions will be used to generate the Employee Management System.\nDo you wish to continue?",
  },
];
//
// Menu questions
//
const menuQuestions = [
  {
    type: "list",
    name: "action",
    message: "What would you like to do? ",
    choices: [
      { value: "01", name: "Manage Departments" },
      { value: "02", name: "Manage Roles" },
      { value: "03", name: "Manage Employees" },
      { value: "99", name: "Exit the Application" },
    ],
    default: "01",
  },
];
//
// Department questions
//
const deptQuestions = [
  {
    type: "list",
    name: "action",
    message: "--- Manage Departments ---",
    choices: [
      { value: "D1", name: "Add Department" },
      { value: "D2", name: "View All Departments" },
      { value: "D3", name: "View a Department By Id" },
      { value: "D4", name: "View a Department By Name" },
      { value: "D5", name: "Update a Department By Id" },
      { value: "D6", name: "Update a Department By Name" },
      { value: "D7", name: "Delete a Department By Id" },
      { value: "D8", name: "Delete a Department By Name" },
    ],
    default: "D2",
  },
  {
    type: "input",
    name: "id",
    message: "What's the department id? ",
    validate: (answer) => {
      return validateNumericInput(answer);
    },
    when: function (answers) {
      return ["D3", "D5", "D7"].indexOf(answers.action) >= 0;
    },
  },
  {
    type: "input",
    name: "name",
    message: "What's the department name? ",
    validate: (answer) => {
      return validateAlphaInput(answer);
    },
    when: function (answers) {
      return ["D1", "D4", "D6", "D8"].indexOf(answers.action) >= 0;
    },
  },
  {
    type: "input",
    name: "deptNewName",
    message: "What's the department new name? ",
    validate: (answer) => {
      return validateAlphaInput(answer);
    },
    when: function (answers) {
      return ["D5", "D6"].indexOf(answers.action) >= 0;
    },
  },
  {
    type: "confirm",
    name: "confirm",
    message:
      "Deleting a department will also delete all the roles and employees associated to that department...\n Do you wish to continue? ",
    when: function (answers) {
      return ["D7", "D8"].indexOf(answers.action) >= 0;
    },
  },
];
//
// Role questions
//
const roleQuestions = [
  {
    type: "list",
    name: "action",
    message: "--- Manage Roles ---",
    choices: [
      { value: "R1", name: "Add Role" },
      { value: "R2", name: "View All Roles" },
      { value: "R3", name: "View a Role By Id" },
      { value: "R4", name: "View a Role By Title" },
      { value: "R5", name: "View a Role By Salary" },
      { value: "R6", name: "View a Role By Department Id" },
      { value: "R7", name: "Update Role By Id" },
      { value: "R8", name: "Update Role By Title" },
      { value: "R9", name: "Update Role By Salary" },
      { value: "R10", name: "Update Role By Department Id" },
      { value: "R11", name: "Delete a Role By Id" },
      { value: "R12", name: "Delete a Role By Title" },
      { value: "R13", name: "Delete a Role By Salary" },
      { value: "R14", name: "Delete a Role By Department Id" },
    ],
    default: "R2",
  },
  {
    type: "input",
    name: "id",
    message: "What's the role id? ",
    validate: (answer) => {
      return validateNumericInput(answer);
    },
    when: function (answers) {
      return ["R3", "R7", "R11"].indexOf(answers.action) >= 0;
    },
  },
  {
    type: "input",
    name: "title",
    message: "What's the role title? ",
    validate: (answer) => {
      return validateAlphaInput(answer);
    },
    when: function (answers) {
      return ["R4", "R8", "R12"].indexOf(answers.action) >= 0;
    },
  },
  {
    type: "input",
    name: "newTitle",
    message: "What's the role new title? ",
    validate: (answer) => {
      return validateAlphaInput(answer);
    },
    when: function (answers) {
      return ["R7", "R9"].indexOf(answers.action) >= 0;
    },
  },
  {
    type: "input",
    name: "salary",
    message: "What's the role salary? ",
    validate: (answer) => {
      return validateNumericInput(answer);
    },
    when: function (answers) {
      return ["R5", "R9", "R13"].indexOf(answers.action) >= 0;
    },
  },
  {
    type: "input",
    name: "dept_id",
    message: "What's the department id? ",
    validate: (answer) => {
      return validateNumericInput(answer);
    },
    when: function (answers) {
      return ["R6", "R10", "R14"].indexOf(answers.action) >= 0;
    },
  },
];
//
// Employee questions
//
const empQuestions = [
  {
    type: "list",
    name: "action",
    message: "--- Manage Employees ---",
    choices: [
      { value: "E1", name: "Create An Employee" },
      { value: "E2", name: "Retrieve All Employees" },
      { value: "E3", name: "Retrieve An Employee By Id" },
      { value: "E4", name: "Retrieve An Employee By First Name" },
      { value: "E5", name: "Retrieve An Employee By Last Name" },
      { value: "E6", name: "Retrieve An Employee By Role Id" },
      { value: "E7", name: "Retrieve An Employee By Manager Id" },
      { value: "E8", name: "Retrieve An Employee By Department Id" },
      { value: "E9", name: "Update An Employee By Id" },
      { value: "E10", name: "Update An Employee By First Name" },
      { value: "E11", name: "Update An Employee By Last Name" },
      { value: "E12", name: "Update An Employee By Role Id" },
      { value: "E13", name: "Update An Employee By Manager Id" },
      { value: "E14", name: "Update An Employee By Department Id" },
      { value: "E15", name: "Delete An Employee By Id" },
      { value: "E16", name: "Update An Employee By First Name" },
      { value: "E17", name: "Update An Employee By Last Name" },
      { value: "E18", name: "Update An Employee By Role Id" },
      { value: "E19", name: "Update An Employee By Manager Id" },
      { value: "E20", name: "Update An Employee By Department Id" },
    ],
    default: "E2",
  },
  {
    type: "input",
    name: "empId",
    message: "What's the employee id? ",
    validate: (answer) => {
      return validateNumericInput(answer);
    },
    when: function (answers) {
      return ["R3", "R9", "R15"].indexOf(answers.action) >= 0;
    },
  },
  {
    type: "input",
    name: "empRoleId",
    message: "What's the role id? ",
    validate: (answer) => {
      return validateAlphaInput(answer);
    },
    when: function (answers) {
      return ["E6", "E12", "E18"].indexOf(answers.action) >= 0;
    },
  },
  {
    type: "input",
    name: "empMgrId",
    message: "What's the manager id? ",
    validate: (answer) => {
      return validateAlphaInput(answer);
    },
    when: function (answers) {
      return ["E7", "E13", "E19"].indexOf(answers.action) >= 0;
    },
  },
  {
    type: "input",
    name: "empDeptId",
    message: "What's the department id? ",
    validate: (answer) => {
      return validateNumericInput(answer);
    },
    when: function (answers) {
      return ["R8", "R14", "R20"].indexOf(answers.action) >= 0;
    },
  },
];
//
// Validate that the input is alphabetical with a lenght of 2 or more words, and at least 1 character each word
//
function validateAlphaInput(input) {
  let message = "Please enter one or more words with letters only";
  if (input.length > 0) {
    return input.match(/^[a-zA-Z]\w*/g) ? true : message;
  } else return message;
}
//
// Validate that the input is numeric with a lenght of 2 or more words, and at least 1 character each word
//
function validateNumericInput(input) {
  let message = "Please enter one or more digits without spaces";
  if (input.length > 0) {
    return input.match(/^[0-9]\w*/g) ? true : message;
  } else return message;
}
//
// Initialize the application
//
function promptStartQuestions() {
  inquirer.prompt(startQuestions).then((answers) => {
    if (answers.continue) {
      conn.connect((err) => {
        if (err) {
          throw err;
          return;
        }
        Database.prototype.conn = conn;
        promptMenuQuestions();
      });
    }
  });
}
//
// Prompt for menu questions
//
function promptMenuQuestions() {
  //console.clear();
  inquirer.prompt(menuQuestions).then((answers) => {
    switch (answers.action) {
      case "01":
        //
        // Manage departments
        //
        promptDeptQuestions();
        break;
      case "02":
        //
        // Manage roles
        //
        promptRoleQuestions();
        break;
      case "03":
        //
        // Manage employees
        //
        promptEmpQuestions();
        break;
      case "99":
        //
        // End the application and the server/database connection
        //
        conn.end();
        break;
    }
  });
}
//
// Prompt for department questions
//
function promptDeptQuestions() {
  //console.clear();
  inquirer.prompt(deptQuestions).then((answers) => {
    //
    const { action, confirm, ...values } = answers;
    const db = new Database();
    //
    switch (action) {
      case "D1":
        //
        // Create record
        //
        db.query("INSERT INTO departments SET ?", values)
          .then((data) => {
            console.log(
              data.affectedRows
                ? "Department created successfully!"
                : `No records created - ${data.message}`
            );
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
        break;
      case "D2":
        //
        // Retrieve all records
        //
        db.query("SELECT name, id FROM departments").then((data) => {
          //
          console.log("\n");
          console.table(data);
          console.log("Press up or down arrow keys to continue...\n\n");
          //
        });
        break;
      case "D3":
      case "D4":
        //
        // Retrieve a record by id, name
        //
        db.query("SELECT name, id FROM departments WHERE ?", values)
          .then((data) => {
            console.log("\n");
            console.table(data);
            console.log("Press up or down arrow keys to continue...\n\n");
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
        break;
      case "D5":
        //
        // Update a record by id
        //
        db.query("UPDATE departments SET ? WHERE ?", [
          {
            name: answers.deptNewName,
          },
          {
            id: answers.id,
          },
        ])
          .then((data) => {
            console.log(
              data.affectedRows
                ? "Department updated successfully!"
                : `No records updated - ${data.message}`
            );
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
        break;
      case "D6":
        //
        // Update a record by name
        //
        console.log(answers);
        db.query("UPDATE departments SET ? WHERE ?", [
          {
            name: answers.deptNewName,
          },
          {
            name: answers.name,
          },
        ])
          .then((data) => {
            console.log(
              data.affectedRows
                ? "Department updated successfully!"
                : `No records updated - ${data.message}`
            );
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
        break;
      case "D7":
      case "D8":
        //
        // Delete a record by id, name
        //
        if (answers.confirm) {
          db.query("DELETE FROM departments WHERE ?", values)
            .then((data) => {
              console.log(
                data.affectedRows
                  ? "Department deleted successfully!"
                  : `No records deleted - ${data.message}`
              );
            })
            .catch((err) => {
              console.log(`Error: ${err}`);
            });
        }
        break;
      //
    }
    //
    // Return to Main Menu
    //
    promptMenuQuestions();
    //
  });
}
//
// Prompt for role questions
//
function promptRoleQuestions() {
  //console.clear();
  inquirer.prompt(roleQuestions).then((answers) => {
    //
    const { action, confirm, ...values } = answers;
    const db = new Database();
    //
    switch (action) {
      case "R1":
        //
        // Create record
        //
        db.query("INSERT INTO roles SET ?", values)
          .then((data) => {
            console.log(
              data.affectedRows
                ? "Record created successfully!"
                : `No records created - ${data.message}`
            );
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
        break;
      case "R2":
        //
        // Retrieve all records
        //
        db.query("SELECT title, id, salary, dept_id FROM roles").then(
          (data) => {
            //
            console.log("\n");
            console.table(data);
            console.log("Press up or down arrow keys to continue...\n\n");
            //
          }
        );
        break;
      case "R3":
      case "R4":
      case "R5":
      case "R6":
        //
        // Retrieve a record by title, id, salary, dept_id
        //
        db.query("SELECT title, id, salary, dept_id FROM roles WHERE ?", values)
          .then((data) => {
            console.log("\n");
            console.table(data);
            console.log("Press up or down arrow keys to continue...\n\n");
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
        break;
      case "R7":
        //
        // Update a record by id
        //
        db.query("UPDATE roles SET ? WHERE ?", [
          {
            name: answers.newTitle,
          },
          {
            id: answers.id,
          },
        ])
          .then((data) => {
            console.log(
              data.affectedRows
                ? "Role updated successfully!"
                : `No records updated - ${data.message}`
            );
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
        break;
      case "R8":
        //
        // Update a record by name
        //
        console.log(answers);
        db.query("UPDATE roles SET ? WHERE ?", [
          {
            name: answers.newTitle,
          },
          {
            name: answers.title,
          },
        ])
          .then((data) => {
            console.log(
              data.affectedRows
                ? "Department updated successfully!"
                : `No records updated - ${data.message}`
            );
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
        break;
      case "R11":
      case "R12":
        //
        // Delete a record by id, title
        //
        if (answers.confirm) {
          db.query("DELETE FROM roles WHERE ?", values)
            .then((data) => {
              console.log(
                data.affectedRows
                  ? "Record deleted successfully!"
                  : `No records deleted - ${data.message}`
              );
            })
            .catch((err) => {
              console.log(`Error: ${err}`);
            });
        }
        break;
      //
    }
    //
    // Return to Main Menu
    //
    promptMenuQuestions();
    //
  });
}
//
// Set the connection to the MySql server/database
//
const conn = mysql.createConnection(config);
//
// Rock & Roll
//
promptStartQuestions();
//
