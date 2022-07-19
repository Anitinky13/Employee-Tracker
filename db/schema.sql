-- DROP DATABASE IF EXISTS employees_db;
-- CREATE DATABASE employee_db;

-- USE employee_db;
CREATE TABLE department (
  id INT  AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT  AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  salary DECIMAL(10.3) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

-- CREATE TABLE employee (
--   id INT NOT NULL AUTO_INCREMENT,
--   first_name VARCHAR(45) NULL,
--   last_name VARCHAR(45) NULL,
--   role_id INT NULL,
--   manager_id INT NULL,
--   PRIMARY KEY (id)
-- );
