'use strict';

//**Exercise 3: Joins**

const util = require('util');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : `userdb`
  });


const executeQuery = util.promisify(connection.query.bind(connection));


async function seedDatabase() {

// 1. Write a query that prints names of all `authors` and their corresponding `collaborators`.
    const authorsCollaborators = `
        SELECT a.author_name, r.conference 
        FROM authors 
        AS A, research_papers 
        AS R 
        WHERE A.author_no = R.author;
        `;

    const leftJoin = `
        SELECT * FROM authors 
        AS A 
        LEFT JOIN research_papers 
        AS r 
        ON r.author = a.author_no;`

    connection.connect();

    try {
        console.log(await executeQuery(authorsCollaborators));
        console.log(await executeQuery(leftJoin));
    }
    catch (error) {
        console.log('Something is wrong =>' ,error);
    }

    connection.end();
}

seedDatabase()
