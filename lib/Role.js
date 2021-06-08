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
      message: "--- Manage Roles ---",
      choices: [
        { value: "10", name: "Add Role" },
        { value: "20", name: "View All Roles" },
        { value: "30", name: "View a Role By Name" },
        { value: "31", name: "View a Role By Department" },
        { value: "32", name: "View a Role By Salary Range" },
        { value: "40", name: "Update a Role" },
        { value: "50", name: "Delete a Role" },
        { value: "98", name: "Exit to Main Menu" },
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
          insertRole();
          break;
        case "20":
          //
          // View all records
          //
          selectAllRole();
          break;
        case "30":
          //
          // View record matching criteria
          //
          selectRole();
          break;
        case "31":
          //
          // View record matching criteria
          //
          selectRoleByDept();
          break;
        case "32":
          //
          // View record matching criteria
          //
          selectRoleBySalRange();
          break;
        case "40":
          //
          // Update a record
          //
          updateRole();
          break;
        case "50":
          //
          // Delete a record
          //
          deleteRole();
          break;
        case "99":
          connection.end();
        //
      }
      //
    });
};
//
// Function to handle inserting new roles
//
const insertRole = () => {
  //
  // Select the department to associate the role to
  //
  connection.query("SELECT name, id FROM departments", (err, results) => {
    if (err) throw err;
    //
    // Prompt for values
    //
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What's the role title? ",
          validate: (answer) => {
            return validateAlphaInput(answer);
          },
        },
        {
          type: "input",
          name: "salary",
          message: "What's the salary? ",
          validate: (answer) => {
            if (isNaN(answer) === false) {
              return true;
            }
            return false;
          },
        },
        {
          type: "list",
          name: "dept_id",
          message: "Choose a department ",
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
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answers.title,
            salary: answers.salary,
            dept_id: answers.dept_id,
          },
          (error, result) => {
            if (error) throw error;
            console.log(
              result.affectedRows
                ? "Role created successfully!"
                : `No records created - ${results.message}`
            );
            start();
          }
        );
      });
  });
  //
};
//
// Function to handle viewing all roles
//
const selectAllRole = () => {
  //
  connection.query(
    "SELECT r.title, r.id, FORMAT(r.salary, 2) as salary, d.name as department FROM roles as r, departments as d WHERE r.dept_id = d.id ORDER BY d.id, r.title",
    (error, result) => {
      if (error) throw error;
      console.table(result);
      start();
    }
  );
};
//
// Function to handle viewing roles by name
//
const selectRole = () => {
  //
  // Prompt for values
  //
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What's the role title? ",
        validate: (answer) => {
          return validateAlphaInput(answer);
        },
      },
    ])
    .then((answers) => {
      //
      // Process the input
      //
      const { title } = answers;
      //
      connection.query(
        `SELECT r.title, r.id, FORMAT(r.salary, 2) as salary, d.name as department FROM roles as r, departments as d WHERE r.dept_id = d.id AND r.title LIKE '%${title}%' ORDER BY d.id, r.title`,
        (error, result) => {
          if (error) throw error;
          console.table(result);
          start();
        }
      );
    });
};
//
// Function to handle viewing roles by department name
//
const selectRoleByDept = () => {
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
        `SELECT r.title, r.id, FORMAT(r.salary, 2) as salary, d.name as department FROM roles as r, departments as d WHERE r.dept_id = d.id AND d.name LIKE '%${name}%' ORDER BY d.name, r.title`,
        (error, result) => {
          if (error) throw error;
          console.table(result);
          start();
        }
      );
    });
};
//
// Function to handle viewing roles by salary range
//
const selectRoleBySalRange = () => {
  //
  // Prompt for values
  //
  inquirer
    .prompt([
      {
        type: "input",
        name: "salLower",
        message: "What's the salary lower range? ",
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        type: "input",
        name: "salUpper",
        message: "What's the salary upper range? ",
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then((answers) => {
      //
      // Process the input
      //
      const { salLower, salUpper } = answers;
      //
      connection.query(
        `SELECT r.title, r.id, FORMAT(r.salary, 2) as salary, d.name as department FROM roles as r, departments as d WHERE r.dept_id = d.id AND r.salary BETWEEN ${salLower} AND ${salUpper} ORDER BY r.salary`,
        (error, result) => {
          if (error) throw error;
          console.table(result);
          start();
        }
      );
    });
};
//
// Function to handle updating new roles
//
const updateRole = () => {
  //
  // Select the role to update
  //
  connection.query("SELECT title, id FROM roles", (err, results) => {
    if (err) throw err;
    //
    // Prompt for user selection
    //
    inquirer
      .prompt([
        {
          type: "list",
          name: "id",
          message: "Choose a role to update",
          choices() {
            const choices = [];
            for (const role of results) {
              const { title, id } = role;
              choices.push({ value: id, name: title });
            }
            return choices;
          },
        },
        {
          type: "input",
          name: "title",
          message: "What's the role new name?",
        },
      ])
      .then((answers) => {
        //
        // Process the input
        //
        connection.query(
          "UPDATE roles SET ? WHERE ?",
          [
            {
              title: answers.title,
            },
            {
              id: answers.id,
            },
          ],
          (error, result) => {
            if (error) throw err;
            console.log(
              result.affectedRows
                ? "Role updated successfully!"
                : `No records updated - ${result.message}`
            );
            start();
          }
        );
      });
  });
};
//
// Function to handle deleting roles
//
const deleteRole = () => {
  //
  // Select the role to delete
  //
  connection.query("SELECT title, id FROM roles", (err, results) => {
    if (err) throw err;
    //
    // Prompt for user selection
    //
    inquirer
      .prompt([
        {
          type: "list",
          name: "id",
          message: "Choose a role to delete",
          choices() {
            const choices = [];
            for (const role of results) {
              const { title, id } = role;
              choices.push({ value: id, name: title });
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
          "DELETE FROM roles WHERE ?",
          [
            {
              id: answers.id,
            },
          ],
          (error, result) => {
            if (error) throw err;
            console.log(
              result.affectedRows
                ? "Role deleted successfully!"
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
