'use strict';

//**Exercise 4: Aggregate Functions**

const util = require('util');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : `userdb`
  });

const executeQuery = util.promisify(connection.query.bind(connection));

async function aggregateFunctions() {

   const numOfAuthors = `
        SELECT COUNT(author) 
        FROM research_papers 
        AS R 
        GROUP BY r.paper_title;`

    const femaleAuthors = `
        SELECT COUNT(paper_title) 
        FROM research_papers 
        AS r 
        INNER JOIN authors 
        AS A 
        ON a.author_no = r.author 
        WHERE a.gender ='f';`

    const avgHindexUniversity=`
        SELECT AVG(h_index),university 
        FROM authors 
        AS a 
        INNER JOIN research_papers 
        AS r 
        ON a.author_no=r.author 
        GROUP BY a.university;`

    const numOfResPapersPerUniversity=`
        SELECT COUNT(r.paper_id),a.university 
        FROM research_papers 
        AS r 
        INNER JOIN authors 
        AS A 
        ON a.author_no = r.author 
        GROUP BY a.university;`

    const minMaxHindex=`
        SELECT MIN(a.h_index),MAX(a.h_index),a.university 
        FROM authors 
        AS a 
        LEFT JOIN research_papers 
        AS r 
        ON a.author_no=r.author 
        GROUP BY a.university;`

    connection.connect();

    try {
        console.log(' All research papers and the number of authors that wrote that paper.', await executeQuery(numOfAuthors));
        console.log('Sum of the research papers published by all female authors.',await executeQuery(femaleAuthors));
        console.log('Average of the h-index of all authors per university.',await executeQuery(avgHindexUniversity));
        console.log('Sum of the research papers of the authors per university. ',await executeQuery(numOfResPapersPerUniversity));
        console.log('Minimum and maximum of the h-index of all authors per university.',await executeQuery(minMaxHindex));

    }
    catch (error) {
        console.log('Something is wrong =>' ,error);
    }

    connection.end();
}

aggregateFunctions()
