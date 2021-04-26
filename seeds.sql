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

INSERT INTO department (name) VALUES ("Software"), ("Hardware"), ("Sales");
INSERT INTO role (title, salary, department_id) VALUES ("Developer", 100.50, 1), ("Debugger", 50.25, 1), ("Engineer", 250.00, 2), ("Rep", 500.00, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Brown", 1, null), ("Sally", "White", 2, 1);