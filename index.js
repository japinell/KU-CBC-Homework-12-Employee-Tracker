//
//  Library imports
//
const inquirer = require("inquirer");
const mysql = require("mysql");
//
const { Department } = require("./lib/Department");
const { Role } = require("./lib/Role");
const { Employee } = require("./lib/Employee");
//
//  Prompts
//
var lastOptionValue = "D2";
var lastOptionName = "Retrieve a Department";
//
// Start questions
//
const startQuestions = [
  {
    type: "confirm",
    name: "continue",
    message:
      "\n\n---------- EMPLOYEE TRACKER GENERATOR ----------\n\nThe following questions will be used to generate the Employee Tracker Database.\nDo you wish to continue?",
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
    default: lastOptionValue,
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
      { value: "D2", name: "Vie All Departments" },
      { value: "D3", name: "View a Department By Id" },
      { value: "D4", name: "View a Department By Name" },
      { value: "D5", name: "Update a Department By Id" },
      { value: "D6", name: "Update a Department By Name" },
      { value: "D7", name: "Delete a Department By Id" },
      { value: "D8", name: "Delete a Department By Name" },
    ],
    default: "D3",
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
      { value: "R1", name: "Create a Role" },
      { value: "R2", name: "Retrieve All Roles" },
      { value: "R3", name: "Retrieve A Role By Id" },
      { value: "R4", name: "Retrieve A Role By Title" },
      { value: "R5", name: "Retrieve A Role By Salary" },
      { value: "R6", name: "Retrieve A Role By Department Id" },
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
    name: "roleId",
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
    name: "roleName",
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
    name: "roleSalary",
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
    name: "roleDeptId",
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
  //
  inquirer.prompt(startQuestions).then((answers) => {
    //
    if (answers.continue) {
      //
      // Connect to the server/database
      //
      console.log("Connecting to the server...");
      conn.connect((err) => {
        //
        if (err) throw err;
        //
        console.log("Connected!");
        Department.prototype.conn = conn;
        promptMenuQuestions();
        //
      });
      //
      //
    }
    //
  });
  //
}
//
// Prompt for menu questions
//
function promptMenuQuestions() {
  //
  inquirer.prompt(menuQuestions).then((answers) => {
    //
    switch (answers.action) {
      //
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
        console.log("Disconnecting from the server...");
        conn.end();
        console.log("Disconnected!");
        break;
      //
    }
    //
  });
  //
}
//
// Prompt for department questions
//
function promptDeptQuestions() {
  //
  inquirer.prompt(deptQuestions).then((answers) => {
    //
    const { action, confirm, ...values } = answers;
    //
    switch (action) {
      //
      case "D1":
        //
        // Create department
        //
        new Department().create(values);
        break;
      case "D2":
        //
        // Retrieve all departments
        //
        new Department().retrieve();
        break;
      case "D3":
      case "D4":
        //
        // Retrieve a department by id, name
        //
        new Department().retrieve(values);
        break;
      case "D5":
        //
        // Update a department by id
        //
        new Department().update(
          {
            name: answers.deptNewName,
          },
          {
            id: answers.deptId,
          }
        );
        break;
      case "D6":
        //
        // Update a department by name
        //
        new Department().update(
          {
            name: answers.deptNewName,
          },
          {
            name: answers.deptName,
          }
        );
        break;
      case "D7":
      case "D8":
        //
        // Delete a department by id, name
        //
        if (answers.confirm) {
          //
          new Department().delete(values);
          //
        }
        break;
      //
    }
    //
    // Go back to the main menu
    //
    promptMenuQuestions();
    //
  });
  //
}
//
// Set the connection to the MySql server/database
//
const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "cms_db",
  debug: true,
});
//
// Rock & Roll
//
promptStartQuestions();
//
