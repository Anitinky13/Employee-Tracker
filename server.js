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
const mysql = require("mysql2");
const inquirer = require("inquirer");
const connection = require("mysql2/typings/mysql/lib/Connection");
require("console.table");

//CONNECT TO DATABASE
const db = mysql.createConnection(
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
  connection.begin (begin, function(err,res) {
        console.log(`Employees:`)
        res.forEach(employee => {
              console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);

        })
        runPrompt();
  }
 
}
//view department function
function viewDepartment() {
  var query = "SELECT * FROM department";
}
//view roles function
//add employee function
//add department function
//add role department
//update role department
