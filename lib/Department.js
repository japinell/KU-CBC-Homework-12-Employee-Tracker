//
// Required libraries
//
const inquirer = require("inquirer");
const mysql = require("mysql");
//
const { validateAlphaInput, validateNumericInput } = require("./Utils");
const { config } = require("./config.js");
//
// Start the connection to the database
//
const connection = mysql.createConnection(config);
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
        { value: "D1", name: "Add Department" },
        { value: "D2", name: "View All Departments" },
        { value: "D3", name: "View a Department By Name" },
        { value: "D4", name: "Update a Department" },
        { value: "D5", name: "Delete a Department" },
        { value: "98", name: "Exit to Main Menu" },
        { value: "99", name: "Exit the Application" },
      ],
      default: "D2",
    })
    .then((answers) => {
      //
      const { action, confirm, ...values } = answers;
      //
      switch (action) {
        case "D1":
          //
          // Create record
          //
          insertDept();
          break;
        case "D2":
          //
          // View all records
          //
          selectAllDept();
          break;
        case "D3":
          //
          // View record matching criteria
          //
          selectDept();
          break;
        case "D4":
          //
          // Update a record
          //
          updateDept();
          break;
        case "D5":
          //
          // Delete a record
          //
          deleteDept();
          break;
        case "99":
          connection.end();
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
      connection.query(
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
  connection.query("SELECT name, id FROM departments", (error, result) => {
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
      connection.query(
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
  connection.query("SELECT name, id FROM departments", (err, results) => {
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
              choices.push({ value: id, name });
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
        connection.query(
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
  connection.query("SELECT name, id FROM departments", (err, results) => {
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
              choices.push({ value: id, name });
            }
            return choices;
          },
        },
      ])
      .then((answers) => {
        //
        // Process the input
        //
        connection.query(
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
// Rock & Roll
//
connection.connect((err) => {
  if (err) throw err;
  //
  start();
  //
});
//
