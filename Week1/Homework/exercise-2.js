'use strict'

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world'
});
connection.connect();

// 1- What are the names of countries with population greater than 8 million?

let step1= `SELECT name,population 
            FROM country 
            WHERE population > 8000000 
            ORDER BY population `

connection.query(step1, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("step1 is ", results);
});


// 2- What are the names of countries that have “land” in their names?

let step2= `SELECT name 
            FROM country 
            WHERE name 
            LIKE '%land%' `

connection.query(step2, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("step2 is ", results);
});


// 3- What are the names of the cities with population in between 500,000 and 1 million?

let step3= `SELECT name 
            FROM country 
            WHERE population 
            BETWEEN 500000 
            AND 1000000`

connection.query(step3, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("step3 is ", results);
});


// 4- What's the name of all the countries on the continent ‘Europe’?

let step4= `SELECT name 
            FROM country 
            WHERE continent = 'europe'`

connection.query(step4, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("step4 is ", results);
});


// 5- List all the countries in the descending order of their surface areas.

let step5= `SELECT name 
            FROM country 
            ORDER BY surfacearea DESC` 

connection.query(step5, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("step5 is ", results);
});


// 6- What are the names of all the cities in the Netherlands?

let step6= `SELECT name 
            FROM city 
            WHERE countrycode='nld'`

connection.query(step6, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("step6 is ", results);
});


// 7- What is the population of Rotterdam?

let step7= `SELECT population 
            FROM city 
            WHERE name ='rotterdam'`

connection.query(step7, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("step7 is ", results);
});


// 8- What's the top 10 countries by Surface Area?

let step8= `SELECT name 
            FROM country 
            ORDER BY surfacearea DESC 
            LIMIT 10`

connection.query(step8, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("step8 is ", results);
});


// 9- What's the top 10 most populated cities?

let step9= `SELECT name 
            FROM city 
            ORDER BY population DESC 
            LIMIT 10`

connection.query(step9, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("step9 is ", results);
});


// 10- What is the population number of the world?

let step10 = `SELECT sum(population) 
              FROM country`

connection.query(step10, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("step10 is ", results);
});



connection.end(); 