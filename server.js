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
connection.connect((err) => {
  if (err) throw err;
  runPrompt();
});

console.table("\n-----------Employee Tracker-------------\n");
//run prompt function
function runPrompt() {
  inquirer
    .prompt({
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
    })
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

//view all employees function
const viewAllEmployees = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    // console.log(`Employees:`);
    // res.forEach((employee) => {
    // console.log(
    //   `ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`
  });
  runPrompt();
};

//view department function
const viewDepartment = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    // console.log(`Department:`);
    // res.forEach((department) => {
    //console.log(`ID: ${deparment.id} | Name: ${department.name}`);
  });
  runPrompt();
};
//view roles function
const viewRoles = () => {
  const query = "SELECT * FROM  role";
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

//add employee function//do i need to add async
const addEmployee = () => {
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
          choices: role,
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
            first_name: data.first_name,
            last_name: data.last_name,
            role_id: data.role_id,
            manager_id: data.manager_id,
          },
          (err) => {
            if (err) throw err;
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
          name: data.newDepartment,
        },
        function (err) {
          if (err) throw err;
        }
      );
      console.log("New department added");
      viewDepartment();
    });
};
// //add role department
const addRole = () => {
  connection.query("SELECT * FROM department", (err, department) => {
    if (err) console.log(err);
    department = department.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });
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
    connection.query("SELECT * FROM role", (err, role) => {
      if (err) console.log(err);
      role = role.map((role) => {
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
                role_id: data.SelectRole,
              },
              {
                id: data.selectEmployee,
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
