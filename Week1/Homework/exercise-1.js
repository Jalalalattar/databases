const mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
});

connection.connect();

// 1- Create a database called meetup. 
connection.query('CREATE DATABASE meetup ', function (error, results) {
    if (error) {
        throw error
    }
    console.log("Database created ;)")
})

// 2- Make a connection to your database. 
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'meetup'
});


// 3-4-5  Create tables called Invitee/ Room/ Meeting . 
const create_tables_query = [
    "CREATE table Invitee (invitee_no int not null, invitee_name varchar(50) not null, invited_by varchar(50))",
    "CREATE table Room (room_no int not null, room_name varchar(50) not null, floor_number int)",
    "CREATE table Meeting (meeting_no int not null, meeting_title varchar(50) not null, starting_time time)"
]

create_tables_query.forEach(table => {
    connection.query(table, function (error, results) {
        if (error) {
            throw error;
        }
        console.log("the tables were created");
    });
})


// 6- Insert 5 rows into each table with relevant fields.

const invitees = [
    { invitee_no: '01', invitee_name: 'Goku', invited_by: 'supreme kai' },
    { invitee_no: '02', invitee_name: 'Vegeta', invited_by: 'supreme kai' },
    { invitee_no: '03', invitee_name: 'Gohan', invited_by: 'supreme kai' },
    { invitee_no: '04', invitee_name: 'Trunks', invited_by: 'supreme kai' },
    { invitee_no: '05', invitee_name: 'Krillin', invited_by: 'supreme kai' },
]

const rooms = [
    { room_no: '101', room_name: 'Earth', floor_number: 11 },
    { room_no: '102', room_name: 'Vegeta', floor_number: 12 },
    { room_no: '103', room_name: 'Namek', floor_number: 13 },
    { room_no: '104', room_name: 'Heaven', floor_number: 14 },
    { room_no: '105', room_name: 'Sadala', floor_number: 15 },
]

const meetings = [
    { meeting_no: '21', meeting_title: 'Dealing with Raditz', starting_time: '09:00' },
    { meeting_no: '22', meeting_title: 'Vegeta and Nappa', starting_time: '10:00' },
    { meeting_no: '23', meeting_title: 'Frieza and the Ginyu force', starting_time: '11:00' },
    { meeting_no: '24', meeting_title: 'Cell attacks', starting_time: '12:00' },
    { meeting_no: '25', meeting_title: 'Majin Buu', starting_time: '15:00' },
]

invitees.forEach(invitee => {
    let insertInvitee = `INSERT INTO invitee VALUES ("${invitee.invitee_no}", "${invitee.invitee_name}", "${invitee.invited_by}")`;

    connection.query(insertInvitee, function (error, results) {
        if (error) throw error;
        console.log("invitee inserted");
    });
})

rooms.forEach(room => {
    let insertRoom = `INSERT INTO room VALUES ("${room.room_no}", "${room.room_name}", "${room.floor_number}")`;

    connection.query(insertRoom, function (error, results) {
        if (error) throw error;
        console.log("room inserted");
    });
})

meetings.forEach(meeting => {
    let insertMeeting = `INSERT INTO meeting VALUES ("${meeting.meeting_no}", "${meeting.meeting_title}", "${meeting.starting_time}")`;

    connection.query(insertMeeting, function (error, results) {
        if (error) throw error;
        console.log("meeting inserted");
    });
})


// printing the tables. 

connection.query('SELECT * FROM invitee', function (error, results) {
    if (error) throw error;
    console.log(results);
});

connection.query('SELECT * FROM room', function (error, results) {
    if (error) throw error;
    console.log(results);
});

connection.query('SELECT * FROM meeting', function (error, results) {
    if (error) throw error;
    console.log(results);
});


connection.end();