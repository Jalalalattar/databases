'use strict';

// **Exercise 1: Keys**

const util = require('util');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : `userdb`
  });

const executeQuery = util.promisify(connection.query.bind(connection));

// 1. Create a table, called `Authors`. Give it the following fields: `(author_no(Primary Key), author_name, university, date_of_birth, h_index, gender)`

async function seedDatabase() {

    const createAutherTable = `
        CREATE TABLE IF NOT EXISTS authors (
        author_no INT AUTO_INCREMENT,
        author_name VARCHAR(50),
        university VARCHAR(50),
        date_of_birth DATE,
        h_index INT,
        gender ENUM('m', 'f')
      );`;

// 2. Write a query that adds a `foreign key` column to `Authors` table that references the column `author_no`.

    const addFriendColumn= `
        ALTER TABLE authors 
        ADD friend INT;`

    const addForeignKey= `
        ALTER TABLE authors 
        ADD CONSTRAINT fk_authors 
        FOREIGN KEY (friend) 
        REFERENCES authors(author_no);`

    connection.connect();

    try {
        await executeQuery(createAutherTable);
        await executeQuery(addFriendColumn);
        await executeQuery(addForeignKey);
    } 
    catch (error) {
        console.log('Something is wrong =>' ,error);
    }

    connection.end();
}

seedDatabase()
