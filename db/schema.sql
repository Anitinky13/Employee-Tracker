-DROP DATABASE IF EXISTS employeesData
CREATE DATABASE employeesData;

 USE employeesData;


CREATE TABLE department (
  id INT  AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) 

);

CREATE TABLE role (
  id INT  AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(department_id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30)
  last_name VARCHAR(30) 
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY (id)
  CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES  role(role_id) ON DELETE CASCADE,
    CONSTRAINT fk_manager FOREIGN KEY(manager_id) REFERENCES  employee(employee_id) ON DELETE SET NULL
);
