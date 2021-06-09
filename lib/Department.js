//
// Required libraries
//
const inquirer = require("inquirer");
const mysql = require("mysql");
//
const { config } = require("./config.js");
const { validateAlphaInput, validateNumericInput } = require("./Utils");
//
// Start the connection to the database
//
const conn = mysql.createConnection(config);
//
// Function which prompts the user for what action they would like to take
//
const start = () => {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "--- Manage Departments ---",
      choices: [
        { value: "10", name: "Add Department" },
        { value: "20", name: "View All Departments" },
        { value: "30", name: "View a Department By Name" },
        { value: "40", name: "Update a Department" },
        { value: "50", name: "Delete a Department" },
        // { value: "98", name: "Exit to Main Menu" },
        { value: "99", name: "Exit the Application" },
      ],
      default: "20",
    })
    .then((answers) => {
      //
      const { action, confirm, ...values } = answers;
      //
      switch (action) {
        case "10":
          //
          // Create record
          //
          insertDept();
          break;
        case "20":
          //
          // View all records
          //
          selectAllDept();
          break;
        case "30":
          //
          // View record matching criteria
          //
          selectDept();
          break;
        case "40":
          //
          // Update a record
          //
          updateDept();
          break;
        case "50":
          //
          // Delete a record
          //
          deleteDept();
          break;
        case "99":
          conn.end();
        //
      }
      //
    });
};
//
// Function to handle inserting new departments
//
const insertDept = () => {
  //
  // Prompt for values
  //
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What's the department name? ",
        validate: (answer) => {
          return validateAlphaInput(answer);
        },
      },
    ])
    .then((answers) => {
      //
      // Process the input
      //
      conn.query(
        "INSERT INTO departments SET ?",
        {
          name: answers.name,
        },
        (error, result) => {
          if (error) throw error;
          console.log(
            result.affectedRows
              ? "Department created successfully!"
              : `No records created - ${results.message}`
          );
          start();
        }
      );
    });
};
//
// Function to handle viewing all departments
//
const selectAllDept = () => {
  //
  conn.query("SELECT name, id FROM departments", (error, result) => {
    if (error) throw error;
    console.table(result);
    start();
  });
};
//
// Function to handle viewing departments by name
//
const selectDept = () => {
  //
  // Prompt for values
  //
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What's the department name? ",
        validate: (answer) => {
          return validateAlphaInput(answer);
        },
      },
    ])
    .then((answers) => {
      //
      // Process the input
      //
      const { name } = answers;
      //
      conn.query(
        `SELECT name, id FROM departments WHERE name LIKE '%${name}%'`,
        (error, result) => {
          if (error) throw error;
          console.table(result);
          start();
        }
      );
    });
};
//
// Function to handle updating new departments
//
const updateDept = () => {
  //
  // Select the department to update
  //
  conn.query("SELECT name, id FROM departments", (err, results) => {
    if (err) throw err;
    //
    // Prompt for user selection
    //
    inquirer
      .prompt([
        {
          type: "list",
          name: "id",
          message: "Choose a department to update",
          choices() {
            const choices = [];
            for (const dept of results) {
              const { name, id } = dept;
              choices.push({ value: id, name: name });
            }
            return choices;
          },
        },
        {
          type: "input",
          name: "name",
          message: "What's the department new name?",
        },
      ])
      .then((answers) => {
        //
        // Process the input
        //
        conn.query(
          "UPDATE departments SET ? WHERE ?",
          [
            {
              name: answers.name,
            },
            {
              id: answers.id,
            },
          ],
          (error, result) => {
            if (error) throw err;
            console.log(
              result.affectedRows
                ? "Department updated successfully!"
                : `No records updated - ${result.message}`
            );
            start();
          }
        );
      });
  });
};
//
// Function to handle deleting departments
//
const deleteDept = () => {
  //
  // Select the department to delete
  //
  conn.query("SELECT name, id FROM departments", (err, results) => {
    if (err) throw err;
    //
    // Prompt for user selection
    //
    inquirer
      .prompt([
        {
          type: "list",
          name: "id",
          message: "Choose a department to delete",
          choices() {
            const choices = [];
            for (const dept of results) {
              const { name, id } = dept;
              choices.push({ value: id, name: name });
            }
            return choices;
          },
        },
      ])
      .then((answers) => {
        //
        // Process the input
        //
        conn.query(
          "DELETE FROM departments WHERE ?",
          [
            {
              id: answers.id,
            },
          ],
          (error, result) => {
            if (error) throw err;
            console.log(
              result.affectedRows
                ? "Department deleted successfully!"
                : `No records deleted - ${result.message}`
            );
            start();
          }
        );
      });
  });
};
//
const promptDeptQuestions = () => {
  //
  conn.connect((err) => {
    if (err) throw err;
    //
    start();
    //
  });
  //
};
//
module.exports = { promptDeptQuestions };
//
