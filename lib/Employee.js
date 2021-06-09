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
const conn = mysql.createConnection(config);
//
// Function which prompts the user for what action they would like to take
//
const start = () => {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "--- Manage Employees ---",
      choices: [
        { value: "10", name: "Add Employee" },
        { value: "20", name: "View All Employees" },
        { value: "30", name: "View an Employee By Name" },
        { value: "31", name: "View an Employee By Role" },
        { value: "32", name: "View an Employee By Department" },
        { value: "33", name: "View an Employee By Manager" },
        { value: "34", name: "View an Employee By Salary Range" },
        { value: "40", name: "Update an Employee Name" },
        { value: "41", name: "Update an Employee Role" },
        { value: "42", name: "Update an Employee Manager" },
        { value: "50", name: "Delete an Employee" },
        //{ value: "98", name: "Exit to Main Menu" },
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
          insertEmployee();
          break;
        case "20":
          //
          // View all records
          //
          selectAllEmployee();
          break;
        case "30":
          //
          // View record matching criteria
          //
          selectEmployee();
          break;
        case "31":
          //
          // View record matching criteria
          //
          selectEmployeeByRole();
          break;
        case "32":
          //
          // View record matching criteria
          //
          selectEmployeeByDept();
          break;
        case "33":
          //
          // View record matching criteria
          //
          selectEmployeeByMgr();
          break;
        case "34":
          //
          // View record matching criteria
          //
          selectEmployeeBySalRange();
          break;
        case "40":
          //
          // Update record matching criteria
          //
          updateEmployeeName();
          break;
        case "41":
          //
          // Update record matching criteria
          //
          updateEmployeeRole();
          break;
        case "42":
          //
          // Update record matching criteria
          //
          updateEmployeeMgr();
          break;
        case "50":
          //
          // Delete a record
          //
          deleteEmployee();
          break;
        case "99":
          conn.end();
        //
      }
      //
    });
};
//
// Function to handle inserting new Employees
//
const insertEmployee = () => {
  //
  // Select the role to associate the employee to
  //
  conn.query("SELECT title, id FROM roles", (err, roles) => {
    if (err) throw err;
    //
    // Select the manager to associate the employee to
    //
    conn.query(
      "SELECT CONCAT(CONCAT(last_name, ', '), first_name) as name, id FROM employees UNION SELECT '*** No Manager' as name, NULL as id;",
      (err, emps) => {
        if (err) throw err;
        //
        // Prompt for values
        //
        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What's the employee first name? ",
              validate: (answer) => {
                return validateAlphaInput(answer);
              },
            },
            {
              type: "input",
              name: "last_name",
              message: "What's the employee last name? ",
              validate: (answer) => {
                return validateAlphaInput(answer);
              },
            },
            {
              type: "list",
              name: "role_id",
              message: "Choose a role ",
              choices() {
                const choices = [];
                for (const role of roles) {
                  const { title, id } = role;
                  choices.push({ value: id, name: title });
                }
                return choices;
              },
            },
            {
              type: "list",
              name: "manager_id",
              message: "Choose a manager ",
              choices() {
                const choices = [];
                for (const emp of emps) {
                  const { name, id } = emp;
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
              "INSERT INTO employees SET ?",
              {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: answers.role_id,
                manager_id: answers.manager_id,
              },
              (error, result) => {
                if (error) throw error;
                console.log(
                  result.affectedRows
                    ? "Employee created successfully!"
                    : `No records created - ${results.message}`
                );
                start();
              }
            );
          });
      }
    );
    //
  });
  //
};
//
// Function to handle viewing all employees
//
const selectAllEmployee = () => {
  //
  conn.query(
    "SELECT CONCAT(CONCAT(e.last_name, ', '), e.first_name) as name, e.id, r.title, d.name as department, IFNULL(CONCAT(CONCAT(m.last_name, ', '), m.first_name), '') as manager FROM employees as e INNER JOIN roles as r ON e.role_id = r.id INNER JOIN departments as d ON r.dept_id = d.id LEFT JOIN employees m ON m.id = e.manager_id ORDER BY e.last_name, e.first_name",
    (error, result) => {
      if (error) throw error;
      console.table(result);
      start();
    }
  );
};
//
// Function to handle viewing employees by name
//
const selectEmployee = () => {
  //
  // Prompt for values
  //
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What's the employee name? ",
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
        `SELECT CONCAT(CONCAT(e.last_name, ', '), e.first_name) as name, e.id, r.title, d.name as department, IFNULL(CONCAT(CONCAT(m.last_name, ', '), m.first_name), '') as manager FROM employees as e INNER JOIN roles as r ON e.role_id = r.id INNER JOIN departments as d ON r.dept_id = d.id LEFT JOIN employees m ON m.id = e.manager_id WHERE CONCAT(CONCAT(e.last_name, ', '), e.first_name) LIKE '%${name}%' ORDER BY e.last_name, e.first_name`,
        (error, result) => {
          if (error) throw error;
          console.table(result);
          start();
        }
      );
    });
};
//
// Function to handle viewing employees by role title
//
const selectEmployeeByRole = () => {
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
      conn.query(
        `SELECT CONCAT(CONCAT(e.last_name, ', '), e.first_name) as name, e.id, r.title, d.name as department, IFNULL(CONCAT(CONCAT(m.last_name, ', '), m.first_name), '') as manager FROM employees as e INNER JOIN roles as r ON e.role_id = r.id INNER JOIN departments as d ON r.dept_id = d.id LEFT JOIN employees m ON m.id = e.manager_id WHERE r.title LIKE '%${title}%' ORDER BY r.title, e.last_name, e.first_name`,
        (error, result) => {
          if (error) throw error;
          console.table(result);
          start();
        }
      );
    });
};
//
// Function to handle viewing employees by department name
//
const selectEmployeeByDept = () => {
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
        `SELECT CONCAT(CONCAT(e.last_name, ', '), e.first_name) as name, e.id, r.title, d.name as department, IFNULL(CONCAT(CONCAT(m.last_name, ', '), m.first_name), '') as manager FROM employees as e INNER JOIN roles as r ON e.role_id = r.id INNER JOIN departments as d ON r.dept_id = d.id LEFT JOIN employees m ON m.id = e.manager_id WHERE d.name LIKE '%${name}%' ORDER BY d.name, e.last_name, e.first_name`,
        (error, result) => {
          if (error) throw error;
          console.table(result);
          start();
        }
      );
    });
};
//
// Function to handle viewing employees by manager name
//
const selectEmployeeByMgr = () => {
  //
  // Prompt for values
  //
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What's the manager name? ",
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
        `SELECT CONCAT(CONCAT(e.last_name, ', '), e.first_name) as name, e.id, r.title, d.name as department, IFNULL(CONCAT(CONCAT(m.last_name, ', '), m.first_name), '') as manager FROM employees as e INNER JOIN roles as r ON e.role_id = r.id INNER JOIN departments as d ON r.dept_id = d.id LEFT JOIN employees m ON m.id = e.manager_id WHERE IFNULL(CONCAT(CONCAT(m.last_name, ', '), m.first_name), '') LIKE '%${name}%' ORDER BY IFNULL(CONCAT(CONCAT(m.last_name, ', '), m.first_name), ''), e.last_name, e.first_name`,
        (error, result) => {
          if (error) throw error;
          console.table(result);
          start();
        }
      );
    });
};
//
// Function to handle viewing Employees by salary range
//
const selectEmployeeBySalRange = () => {
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
      conn.query(
        `SELECT CONCAT(CONCAT(e.last_name, ', '), e.first_name) as name, e.id, r.title, FORMAT(r.salary, 2) as salary, d.name as department, IFNULL(CONCAT(CONCAT(m.last_name, ', '), m.first_name), '') as manager FROM employees as e INNER JOIN roles as r ON e.role_id = r.id INNER JOIN departments as d ON r.dept_id = d.id LEFT JOIN employees m ON m.id = e.manager_id WHERE r.salary BETWEEN ${salLower} AND ${salUpper} ORDER BY r.salary, e.last_name, e.first_name`,
        (error, result) => {
          if (error) throw error;
          console.table(result);
          start();
        }
      );
    });
};
//
// Function to handle updating employees name
//
const updateEmployeeName = () => {
  //
  // Select the employee to update
  //
  conn.query(
    "SELECT CONCAT(CONCAT(last_name, ', '), first_name) as name, id FROM employees",
    (err, emps) => {
      if (err) throw err;
      //
      // Prompt for user selection
      //
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "Choose an employee to update",
            choices() {
              const choices = [];
              for (const emp of emps) {
                const { name, id } = emp;
                choices.push({ value: id, name: name });
              }
              return choices;
            },
          },
          {
            type: "input",
            name: "first_name",
            message: "What's the employee first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What's the employee last name?",
          },
        ])
        .then((answers) => {
          //
          // Process the input
          //
          conn.query(
            "UPDATE employees SET ? WHERE ?",
            [
              {
                first_name: answers.first_name,
                last_name: answers.last_name,
              },
              {
                id: answers.id,
              },
            ],
            (error, result) => {
              if (error) throw err;
              console.log(
                result.affectedRows
                  ? "Employee updated successfully!"
                  : `No records updated - ${result.message}`
              );
              start();
            }
          );
        });
    }
  );
};
//
// Function to handle updating employees role
//
const updateEmployeeRole = () => {
  //
  // Select the employee to update
  //
  conn.query(
    "SELECT CONCAT(CONCAT(last_name, ', '), first_name) as name, id FROM employees",
    (err, emps) => {
      if (err) throw err;
      conn.query("SELECT title, id FROM roles", (err, roles) => {
        if (err) throw err;
        //
        // Prompt for user selection
        //
        inquirer
          .prompt([
            {
              type: "list",
              name: "id",
              message: "Choose an employee to update",
              choices() {
                const choices = [];
                for (const emp of emps) {
                  const { name, id } = emp;
                  choices.push({ value: id, name: name });
                }
                return choices;
              },
            },
            {
              type: "list",
              name: "role_id",
              message: "Choose a role to assign the employee",
              choices() {
                const choices = [];
                for (const role of roles) {
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
            conn.query(
              "UPDATE employees SET ? WHERE ?",
              [
                {
                  role_id: answers.role_id,
                },
                {
                  id: answers.id,
                },
              ],
              (error, result) => {
                if (error) throw err;
                console.log(
                  result.affectedRows
                    ? "Employee updated successfully!"
                    : `No records updated - ${result.message}`
                );
                start();
              }
            );
          });
      });
    }
  );
};
//
// Function to handle updating employees manager
//
const updateEmployeeMgr = () => {
  //
  // Select the employee to update
  //
  conn.query(
    "SELECT CONCAT(CONCAT(last_name, ', '), first_name) as name, id FROM employees",
    (err, emps) => {
      if (err) throw err;
      conn.query(
        "SELECT CONCAT(CONCAT(last_name, ', '), first_name) as name, id FROM employees",
        (err, mgrs) => {
          if (err) throw err;
          //
          // Prompt for user selection
          //
          inquirer
            .prompt([
              {
                type: "list",
                name: "id",
                message: "Choose an employee to update",
                choices() {
                  const choices = [];
                  for (const emp of emps) {
                    const { name, id } = emp;
                    choices.push({ value: id, name: name });
                  }
                  return choices;
                },
              },
              {
                type: "list",
                name: "manager_id",
                message: "Choose a manager to assign the employee",
                choices() {
                  const choices = [];
                  for (const mgr of mgrs) {
                    const { name, id } = mgr;
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
                "UPDATE employees SET ? WHERE ?",
                [
                  {
                    manager_id: answers.manager_id,
                  },
                  {
                    id: answers.id,
                  },
                ],
                (error, result) => {
                  if (error) throw err;
                  console.log(
                    result.affectedRows
                      ? "Employee updated successfully!"
                      : `No records updated - ${result.message}`
                  );
                  start();
                }
              );
            });
        }
      );
    }
  );
};
//
// Function to handle deleting Employees
//
const deleteEmployee = () => {
  //
  // Select the Employee to delete
  //
  conn.query(
    "SELECT CONCAT(CONCAT(last_name, ', '), first_name) as name, id FROM employees",
    (err, emps) => {
      if (err) throw err;
      //
      // Prompt for user selection
      //
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "Choose an employee to delete",
            choices() {
              const choices = [];
              for (const emp of emps) {
                const { name, id } = emp;
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
            "DELETE FROM employees WHERE ?",
            [
              {
                id: answers.id,
              },
            ],
            (error, result) => {
              if (error) throw err;
              console.log(
                result.affectedRows
                  ? "Employee deleted successfully!"
                  : `No records deleted - ${result.message}`
              );
              start();
            }
          );
        });
    }
  );
};
//
const promptEmpQuestions = () => {
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
module.exports = { promptEmpQuestions };
//
