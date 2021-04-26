const mysql = require("mysql");
require("dotenv").config();
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const mainMenu = [
  {
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: ["Add something", "View something", "Update employee roles", "Exit"],
  },
];

function mainMenuAsk() {
  inquirer.prompt(mainMenu).then((mainMenuSelection) => {
    if (mainMenuSelection.options === "Add something") {
      addAsk();
    }
    else if (mainMenuSelection.options === "View something") {
      viewAsk();
    }
    else if (mainMenuSelection.options === "Update employee roles") {
      updateAsk();
    }
    else {
      console.log("Goodbye!");
      connection.end();
    }
  });
}

const addMenu = [
  {
      type: "list",
      name: "options",
      message: "What would you like to add?",
      choices: ["A department", "A role", "An employee", "Nevermind"],
  },
];

const addDepartment = [
  {
    type: "input",
    name: "name",
    message: "What is the new department's name?",
  },
];

var departmentChoices = [];
const addRole = [
  {
    type: "input",
    name: "title",
    message: "What is the new role's title?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the new role's salary?",
  },
  {
    type: "list",
    name: "department",
    message: "Which department does the new role belong to?",
    choices: departmentChoices,
  },
];

var roleChoices = ["None"];
var managerChoices = ["No manager"];
const addEmployee = [
  {
    type: "input",
    name: "firstName",
    message: "What is the new employee's first name?",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the new employee's last name?",
  },
  {
    type: "list",
    name: "role",
    message: "What is the new employee's role?",
    choices: roleChoices,
  },
  {
    type: "list",
    name: "manager",
    message: "Who is the new employee's manager?",
    choices: managerChoices,
  },
];

function addAsk() {
  inquirer.prompt(addMenu).then((addMenuSelection) => {
    if (addMenuSelection.options === "A department") {
      inquirer.prompt(addDepartment).then((addDepartmentAnswer) => {
        connection.query(`INSERT INTO department (name) VALUES ("${addDepartmentAnswer.name}");`);
        mainMenuAsk();
      });
    }
    else if (addMenuSelection.options === "A role") {
      connection.query(`SELECT * FROM employeetracker_db.department;`, (err, res) => {
        for (let i = 0; i < res.length; i++) {
          let departmentChoice = res[i].name;
          if (!departmentChoices.includes(departmentChoice)) {
            departmentChoices.push(departmentChoice);
          }
        }

        inquirer.prompt(addRole).then((addRoleAnswers) => {
          connection.query(`SELECT * FROM employeetracker_db.department WHERE department.name = "${addRoleAnswers.department}";`, (err, res) => {
            var departmentId = res[0].id;
  
            connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${addRoleAnswers.title}", ${addRoleAnswers.salary}, ${departmentId});`);
          });

          mainMenuAsk();
        });
      });
    }
    else if (addMenuSelection.options === "An employee") {
      connection.query(`SELECT * FROM employeetracker_db.role;`, (err, res) => {
        for (let i = 0; i < res.length; i++) {
          let roleChoice = res[i].title;
          if (!roleChoices.includes(roleChoice)) {
            roleChoices.push(roleChoice);
          }
        }

        connection.query(`SELECT * FROM employeetracker_db.employee;`, (err, res) => {
          for (let i = 0; i < res.length; i++) {
            let managerChoice = `${res[i].first_name} ${res[i].last_name}`;
            if (!managerChoices.includes(managerChoice)) {
              managerChoices.push(managerChoice);
            }
          }
  
          inquirer.prompt(addEmployee).then((addEmployeeAnswers) => {
            connection.query(`SELECT * FROM employeetracker_db.role WHERE role.title = "${addEmployeeAnswers.role}";`, (err, res) => {
              var employeeRoleId = res[0].id;

              var employeeManagerId;
              if (addEmployeeAnswers.manager === "No manager") {
                employeeManagerId = null;
              }
              else {
                employeeManagerId = managerChoices.indexOf(addEmployeeAnswers.manager);
              }
    
              connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${addEmployeeAnswers.firstName}", "${addEmployeeAnswers.lastName}", ${employeeRoleId}, ${employeeManagerId});`);
            });

            mainMenuAsk();
          });
        });
      });
    }
    else {
      mainMenuAsk();
    }
  });
}

const viewMenu = [
  {
      type: "list",
      name: "options",
      message: "What would you like to view?",
      choices: ["Departments", "Roles", "Employees", "The total budget of a department", "Nevermind"],
  },
];

const ViewMenuExit = [
  {
    type: "confirm",
    name: "choice",
    message: "Are you finished viewing?",
    default: true,
  },
];

function finishViewing() {
  inquirer.prompt(ViewMenuExit).then((ViewMenuExitSelection) => {
    if (ViewMenuExitSelection.choice === true) {mainMenuAsk();}
    else {finishViewing();}
  });
}

const budgetMenu = [
  {
      type: "list",
      name: "options",
      message: "Which department would you like to view the total budget for?",
      choices: departmentChoices,
  },
];

function viewAsk() {
  inquirer.prompt(viewMenu).then((viewMenuSelection) => {
    if (viewMenuSelection.options === "Departments") {
      connection.query(`SELECT * FROM employeetracker_db.department;`, (err, res) => {
        console.table(res);
        finishViewing();
      });
    }
    else if (viewMenuSelection.options === "Roles") {
      connection.query(`SELECT * FROM employeetracker_db.role;`, (err, res) => {
        console.table(res);
        finishViewing();
      });
    }
    else if (viewMenuSelection.options === "Employees") {
      connection.query(`SELECT * FROM employeetracker_db.employee;`, (err, res) => {
        console.table(res);
        finishViewing();
      });
    }
    else if (viewMenuSelection.options === "The total budget of a department") {
      connection.query(`SELECT * FROM employeetracker_db.department;`, (err, res) => {
        for (let i = 0; i < res.length; i++) {
          let departmentChoice = res[i].name;
          if (!departmentChoices.includes(departmentChoice)) {
            departmentChoices.push(departmentChoice);
          }
        }

        inquirer.prompt(budgetMenu).then((budgetMenuSelection) => {
          connection.query(`SELECT * FROM employeetracker_db.department WHERE department.name = "${budgetMenuSelection.options}";`, (err, res) => {
            var departmentId = res[0].id;
  
            connection.query(`SELECT role.salary FROM employee INNER JOIN role ON employee.role_id = role.id WHERE role.department_id="${departmentId}"`, (err, res) => {
              var salarySum = 0;
              for (let i = 0; i < res.length; i++){
                salarySum += res[i].salary;
              }
              console.log(salarySum);
              finishViewing();
            });
          });
        });
      });
    }
    else {
      mainMenuAsk();
    }
  });
}

var employeeChoices = ["Nevermind"];
const updateEmployeeMenu = [
  {
      type: "list",
      name: "options",
      message: "Which employee would you like to update?",
      choices: employeeChoices,
  },
];

const newRoleMenu = [
  {
    type: "list",
    name: "options",
    message: "What should this employee's new role be?",
    choices: roleChoices,
},
]

function updateAsk() {
  connection.query(`SELECT * FROM employeetracker_db.employee;`, (err, res) => {
    for (let i = 0; i < res.length; i++) {
      let employeeChoice = `${res[i].first_name} ${res[i].last_name}`;
      if (!employeeChoices.includes(employeeChoice)) {
        employeeChoices.push(employeeChoice);
      }
    }

    inquirer.prompt(updateEmployeeMenu).then((updateEmployeeMenuSelection) => {
      if ((updateEmployeeMenuSelection.options === "Nevermind")) {
        mainMenuAsk();
      }
      else {
        connection.query(`SELECT * FROM employeetracker_db.role;`, (err, res) => {
          for (let i = 0; i < res.length; i++) {
            let roleChoice = res[i].title;
            if (!roleChoices.includes(roleChoice)) {
              roleChoices.push(roleChoice);
            }
          }

          inquirer.prompt(newRoleMenu).then((newRoleMenuSelection) => {
            var employeeId = employeeChoices.indexOf(updateEmployeeMenuSelection.options);
            var roleId = roleChoices.indexOf(newRoleMenuSelection.options);
            connection.query(`UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId};`);
            mainMenuAsk();
          });
        });
      }
    });
  });
}

mainMenuAsk();