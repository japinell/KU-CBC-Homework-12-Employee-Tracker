# 12 MySQL: Employee Tracker

## Description

The purpose of this application is to architect and build a solution for managing a company's employees using **Node**, **Inquirer**, and **MySQL**. The application should make it easy for end users to view and interact with information stored in the database. At a minimum, it should allow to:

- Add departments, roles, employees
- View departments, roles, employees
- Update employee roles

## User Story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

This application requires **Node.js** JavaScript Runtime, **Inquirer.js** and **MySQL** packages. Basic knowledge of [Node.js](https://nodejs.org/en/), [Inquirer.js](https://www.npmjs.com/package/inquirer), and [MySQL.js](https://www.npmjs.com/package/mysql) is recommended to run the application. To faciliate the installation and run of the application, a _package.json_ file is provided with the project along with basic instructions of how to install the required libraries:

```bash
npm i inquirer
npm i mysql
```

Additionally, the following files are provided to create the database with predefined records (files can be found in the _db_ folder):

```bash
schema.sql
seed.sql
```

Watch a video demonstrating how to create and seed the database with sample data [here](https://drive.google.com/file/d/1V4JamtXEDNW5mMYjJceyYUMv9qEopBeq/view).

The application features the use of **MySQL** package to connect to a MySQL database and perform queries, **Inquirer** to interact with the user via the command-line, and **console.table** to print MySQL rows to the console.

## Usage

The application is invoked by using the following command:

```bash
node index.js
```

A video demonstrating how to run the application is provided [here](https://drive.google.com/file/d/1dBTxvoGaN08_HVWo0yIS25ipMxUuH5tc/view).

The application shows the user a menu with options to manage departments, roles, and employees. After selecting an action to perform, for instance, managing employees, the user is presented with another meny to view, insert, update, and delete employees using a series of predefined options.

Videos demonstrating the application functionality are provided below:

- Manage departments (watch [here](https://drive.google.com/file/d/1N7lv9zKxndbqw7tl-d3kQcWjpGew1sZ4/view))

- Manage roles (watch [here](https://drive.google.com/file/d/16ImLAI43WQf5xy6W6q4OVq_9HdGWPJXW/view))

- Manage employees (watch [here](https://drive.google.com/file/d/1qwCLKWAdyk3OCZO9t46J9M5LG-mAJ14v/view))

If you want to cancel the application execution while running it locally, press the following command in Microsoft Windows, or equivalent commands in Mac OS and Linux:

```bash
CTRL + C
```

## License

This project is licensed under The MIT License. Refer to https://opensource.org/licenses/MIT for more information of what you can and cannot do with this project. See contact information below if you have questions, comments, or suggestions for the project.

## Contributing Guidelines

Want to contribute to this project? You may clone or fork the project in GitHub. Note the licesing information referred in this file.

## Contact Information

For questions, comments, or suggestions, please contact me by E-Mail:

japinell@yahoo.com

Check out my other **cool** projects in GitHub - https://github.com/japinell

## License

This application is licensed under the following license:

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)(https://opensource.org/licenses/MIT)
