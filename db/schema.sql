-DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employee_db;

-- USE employee_db;
CREATE TABLE department (
  id INT  AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT  AUTO_INCREMENT, PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(7.2) NOT NULL,
  department_id INT
CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
  CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES  role_id(id)
     FOREIGN KEY(manager_id) REFERENCES  employee(id)
);
