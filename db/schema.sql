DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10,2),
  dept_id INT,
  INDEX dept_idx (dept_id),
  FOREIGN KEY (dept_id) REFERENCES departments(id)
	ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT DEFAULT NULL,
  INDEX role_idx (role_id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
    ON DELETE CASCADE,
  INDEX manager_idx (manager_id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)
    ON DELETE CASCADE,
  PRIMARY KEY (id)
);