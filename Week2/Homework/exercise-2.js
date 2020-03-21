'use strict';

// **Exercise 2: Relationships**

const util = require('util');
const mysql = require('mysql');
const authors = require("./authorsList");
const publications = require ('./puplicationsList')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : `userdb`
  });

const executeQuery = util.promisify(connection.query.bind(connection));

// 1. Create another table, called `Research_Papers`

async function relationshipsFunction() {
    const createResearchPapars = `
        CREATE TABLE IF NOT EXISTS research_papers (
        paper_id INT,
        paper_title VARCHAR(50),
        publish_date DATE,
        author INT,
        CONSTRAINT FK_AUTHOR FOREIGN KEY (author) REFERENCES authors(author_no),
        conference VARCHAR(50)
      );`;

    connection.connect();

    try {
        await executeQuery(createResearchPapars);
        await Promise.all(
            authors.map(async item => {
            const entry = `INSERT INTO authors SET ?`;
            await executeQuery(entry, item)
        }))

        await Promise.all(
            publications.map(async item => {
            const entry = `INSERT INTO research_papers SET ?`;
            await executeQuery(entry, item)
        }))


    } catch (error) {
        console.log('Something is wrong =>' ,error);
    }

    connection.end();
}
relationshipsFunction()