const mysql = require('mysql2');

const DB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'interactive_reading_club'
});

DB.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', DB.threadId);
});

module.exports = DB;