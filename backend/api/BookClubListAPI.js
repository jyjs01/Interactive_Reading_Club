const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');

function BookClubListAPI(request, response) {
    
    // 모든 독서 클럽 정보 불러오기

    DB.query('SELECT * FROM BookClub', (error, results)=>{
        if (error) {
            console.log(error);
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ success: false, message: 'Database error' }));
            return;
        }

        const bookclubs = results;

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ success: true, bookclubs }));
    })
}

module.exports = BookClubListAPI;