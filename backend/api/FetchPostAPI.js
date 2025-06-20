const sanitize = require('sanitize-html');
const DB = require('../database');
const qs = require('qs');

function FetchPostAPI(request, response) {

    let body = "";

    request.on("data", data=>{
        body += data;
    });

    request.on("end", ()=>{

        let getID = qs.parse(body);
        let getClubID = sanitize(getID.club_id);


        DB.query('SELECT * FROM Post WHERE ClubID = ?', [getClubID], (error, results)=>{
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
    });
}

module.exports = FetchPostAPI;