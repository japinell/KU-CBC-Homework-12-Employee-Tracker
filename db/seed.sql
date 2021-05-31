-- Departments
INSERT INTO departments (name)
VALUES ("Sales");
INSERT INTO departments (name)
VALUES ("Engineering");
INSERT INTO departments (name)
VALUES ("Finance");
INSERT INTO departments (name)
VALUES ("Legal");

-- Roles
INSERT INTO roles (title, salary, dept_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO roles (title, salary, dept_id)
VALUES ("Sales Person", 85000, 1);
INSERT INTO roles (title, salary, dept_id)
VALUES ("Lead Engineer", 120000, 2);
INSERT INTO roles (title, salary, dept_id)
VALUES ("Software Engineer", 100000, 2);
INSERT INTO roles (title, salary, dept_id)
VALUES ("Accountant", 75000, 3);
INSERT INTO roles (title, salary, dept_id)
VALUES ("Legal Team Lead", 95000, 4);
INSERT INTO roles (title, salary, dept_id)
VALUES ("Lawyer", 90000, 4);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Malia", "Brown", 5, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lourd", 6, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 7, 6);