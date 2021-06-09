//
//  Library imports
//
const inquirer = require("inquirer");
const mysql = require("mysql");
//
const { promptDeptQuestions } = require("./lib/Department.js");
const { promptRoleQuestions } = require("./lib/Role.js");
const { promptEmpQuestions } = require("./lib/Employee.js");
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
// Initialize the application
//
function promptStartQuestions() {
  inquirer.prompt(startQuestions).then((answers) => {
    if (answers.continue) {
      promptMenuQuestions();
    }
  });
}
//
// Prompt for menu questions
//
function promptMenuQuestions() {
  // console.clear();
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
        break;
    }
    //
    //promptMenuQuestions();
    //
  });
}
//
// Rock & Roll
//
promptStartQuestions();
//
