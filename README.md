# Unit-12-MySQL-Homework
# Employee Tracker

This application is an Employee Tracker run through the command line. Users are taken through a series of prompts to manage a MySQL database containing information about a business' departments, employees, and employee roles. Currently, users can add/view departments, employees, and roles, update employees' roles, and view the total combined salaries for all employees in a particular department.

The Employee Tracker's GitHub repository can be found [here](https://github.com/elisesamanthadaly/Unit-12-MySQL-Homework).


## Installation
Clone the repository to your local machine. You should also have Git Bash, Node.js, and MySQL/MySQL Workbench installed. You'll need to run npm install from the terminal at the root directory of the local repository to install the application's dependencies (mysql, inquirer, dotenv, and console.table). You will also need to create a .env file (containing DB_USER=root, DB_PASSWORD=YourPassword, DB_NAME=employeeTracker_db) at this location. Before running the application, create its database in MySQL Workbench. You can copy/paste the contents of seeds.sql into a MySQL query to do so. Be sure the database is connected to Port 3306.


## Usage

This [video](https://drive.google.com/file/d/17kcvU3Ywnt-OI4KvioB_AvR9-wKympeq/view?usp=sharing) details how to use the Employee Tracker.


## Credits

This application relies on [mysql](https://www.npmjs.com/package/mysql) and [Inquirer.js](https://www.npmjs.com/package/inquirer). It also uses [dotenv](https://www.npmjs.com/package/dotenv) and [console.table](https://www.npmjs.com/package/console.table).


## License

MIT License

Copyright (c) 2021 Elise Daly

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.