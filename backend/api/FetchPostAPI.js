const DB = require('../database');

function FetchPostAPI(response) {

    DB.query('SELECT * FROM Post', (error, results)=>{
        if (error) {
            console.log(error);
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ success: false, message: 'Database error' }));
            return;
        }

        const posts = results;

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ success: true, posts }));
    });
}

module.exports = FetchPostAPI;