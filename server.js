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
//need to use inquirer for the questions prompts
const inquirer = require("inquirer");
// connection = require("mysql2/typings/mysql/lib/Connection");
const console = require("console");

//CONNECT TO DATABASE
const connection = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "",
    database: "employeesData",
  },
  console.log("Connected to the election database.")
);
//if theres a connection error this will throw an error.
connection.connect((err) => {
  if (err) throw err;
  runPrompt();
});

console.table("\n-----------Employee Tracker-------------\n");
//run prompt function, this first thing a user will see.
function runPrompt() {
  inquirer
    .prompt({
      name: "selection",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View Department",
        "View Roles",
        "Add A Department",
        "Add Role",
        "Add Employee",
        "Update  Role",
        "End",
      ],
    })
    //if the answer selected one of these then show that what the user chose. other wise end the prompt function.
    .then(function (answers) {
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

//view all employees function,, if a user selects to see all employees, then this will get the information using SELECT FROM employee
const viewAllEmployees = () => {
  const query = "SELECT * FROM employee";
  //if theres an error, this will throw an error.
  connection.query(query, (err, res) => {
    if (err) throw err;
    //other wise it will show the information.
    console.table(res);
    // console.log(`Employees:`);
    // res.forEach((employee) => {
    // console.log(
    //   `ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`
  });
  runPrompt();
};

//view department function, if the user selects to view the department, it will use the SELECT FROM  department.
const viewDepartment = () => {
  const query = "SELECT * FROM department";
  //if theres an error. it will throw the error.
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    // console.log(`Department:`);
    // res.forEach((department) => {
    //console.log(`ID: ${deparment.id} | Name: ${department.name}`);
  });
  runPrompt();
};
//view roles function, if the user selects to view Roles. this will use the SELECT FROM role.
const viewRoles = () => {
  const query = "SELECT * FROM  role";
  //if theres an error this will throw an error.
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    //console.log(`Roles:`);
    //res.forEach((role) => {
    // console.log(
    // `ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.id}`
  });
  runPrompt();
};

//add employee function, if user wants to add an employee, this will let the user add.
const addEmployee = () => {
  connection.query("SELECT * FROM role", (err, roles) => {
    //if theres an error. it will console log the error.
    if (err) console.log(err);
    roles = roles.map((role) => {
      //otherwise it will return the role title and role id.
      return {
        name: role.title,
        value: role.id,
      };
    });
    //this inquirer prompt will ask the question to add the employee.
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is Employees first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: " What is Employees last name?",
        },
        {
          name: "Role",
          type: "list",
          message: "What is the role of the employee?",
          choices: roles,
          //                  //need help how do i input the roles?
        },
        {
          name: "managerId",
          type: "list",
          message: "Managers id?",
          choices: [1, 2, 3, 4],
        },
      ])
      .then((data) => {
        console.log(data.role);
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: data.role,
            manager_id: data.managerId,
          },
          //if theres an error it will return error
          (err) => {
            if (err) throw err;
            //other wise it will update the employees.
            console.log("Updated Employees;");
            viewAllEmployees();
          }
        );
      });
  });
};

// //add department function
// function addDepartment() {}
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "Enter department name",
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: data.department,
        },
        function (err) {
          if (err) throw err;
        }
      );
      console.log("New department added");
      viewDepartment();
    });
};
// //add role department, if a user wants to add a role, this function will be used.
const addRole = () => {
  connection.query("SELECT * FROM department", (err, department) => {
    //if theres an error. then this will throw an error.
    if (err) console.log(err);
    department = department.map((department) => {
      //otherwise it will return the name and id
      return {
        name: department.name,
        value: department.id,
      };
    });
    //this will prompt the question
    inquirer
      .prompt([
        {
          type: "input",
          name: "newRole",
          message: "Enter new role name?",
        },
        {
          name: "salary",
          type: "input",
          message: "Salary for the new role?",
        },
        {
          name: "departmentId",
          type: "list",
          message: "New roles department?",
          choices: department,
        },
      ])
      .then((data) => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: data.newRole,
            salary: data.salary,
            department_id: data.departmentId,
          },
          function (err) {
            if (err) throw err;
          }
        );
        console.log("added new role!");
        viewRoles();
      });
  });
};

// //update employee role
const updateRole = () => {
  connection.query("SELECT * FROM  employee", (err, employee) => {
    if (err) console.log(err);
    employee = employee.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      };
    });
    connection.query("SELECT * FROM role", (err, roles) => {
      if (err) console.log(err);
      roles = roles.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Select an employee to update",
            choices: employee,
          },
          {
            name: "role",
            type: "list",
            message: "Select new role",
            choices: role,
          },
        ])
        .then((data) => {
          connection.query(
            "UPDATE employee SET  ? WHERE ?",
            [
              {
                role_id: data.role,
              },
              {
                id: data.employee,
              },
            ],
            function (err) {
              if (err) throw err;
            }
          );
          console.log("Employee role updated successfully!");
          viewRoles();
        });
    });
  });
};
