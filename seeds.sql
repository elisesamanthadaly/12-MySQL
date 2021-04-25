DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT(10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT(10) NOT NULL,
  manager_id INT(10),
  PRIMARY KEY (id)
);

-- ADD
INSERT INTO department (name) VALUES ("software");
INSERT INTO role (title, salary, department_id) VALUES ("engineer", 100.50, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Brown", 1, null), ("Sally", "White", 1, 1);

-- VIEW
SELECT * FROM employeetracker_db.department;
SELECT * FROM employeetracker_db.role;
SELECT * FROM employeetracker_db.employee;

-- UPDATE
UPDATE employee SET role_id = 2 WHERE id = 1;