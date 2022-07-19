//const express = require("express");
//const PORT = process.env.PORT || 3005;
//const app = express();
// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// app.get("/", (req, res) => {
//   res.json({
//     message: "Hello World",
//   });
// });
// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
//dependancies
const mysql = require("mysql");
const inquirer = require("inquirer");
// connection = require("mysql2/typings/mysql/lib/Connection");
require("console.table");

//CONNECT TO DATABASE
const connection = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "",
    database: "election",
  },
  console.log("Connected to the election database.")
);
connection.connect((err) => {
  if (err) throw err;
  runPrompt();
});

console.table("\n-----------Employee Tracker-------------\n");
//run prompt function
function runPrompt() {
  inquirer({
    name: "selection",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View Department",
      "View  Roles",
      "Add A Department",
      "Add Role",
      "Add An Employee",
      "Update Employee Role",
      "End",
    ],
  }).then(function (answers) {
    console.log(answers);
    if (answers.selection === "View All Employees") {
      viewAllEmployees();
    } else if (answers.selection === "View Department") {
      viewDepartment();
    } else if (answers.selection === "View Roles") {
      viewRoles();
    } else if (answers.selection === "Add Employee") {
      addEmployee();
    } else if (answers.selection === "Add A Department") {
      addDepartment();
    } else if (answers.selection === "Add Role") {
      addRole();
    } else if (answers.selection === "Update Role") {
      updateRole();
    } else {
      connection.end();
    }
  });
}

//view all employees function
function viewEmployees() {
  var begin = "SELECT * FROM employee";
  connection.begin(begin, function (err, res) {
    console.log(`Employees:`);
    res.forEach((employee) => {
      console.log(
        `ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`
      );
    });
    runPrompt();
  });
}

//view department function
function viewDepartment() {
  var begin = "SELECT * FROM department";
  connection.begin(begin, function (err, res) {
    console.log(`Department:`);
    res.forEach((department) => {
      console.log(`ID: ${deparment.id} | Name: ${department.name}`);
    });
    runPrompt();
  });
}
//view roles function
function viewRoles() {
  var begin = "SELECT * FROM  role";
  connection.begin(begin, function (err, res) {
    console.log(`Roles:`);
    res.forEach((role) => {
      console.log(
        `ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.id}`
      );
    });
    runPrompt();
  });
}
//add employee function//do i need to add async
function addEmployee() {
      connection.begin('SELECT * FROM role', function(err,res) {
            inquirer 
            .prompt([{
                  name: "firstName",
                  type:"input",
                  message: "What is Employees first name?",
            },
            {
                  name: "lastName",
                  type: "input",
                  message: " What is Employees last name?",
            },
            {
                  name: "Role",
                  type:'list',
                  message: "What is the role of the employee?",
                 choices: 
                 //need help how do i input the roles?
            }
      ])
      })
}

//add department function
function addDepartment() {}
//add role department
//update role department
