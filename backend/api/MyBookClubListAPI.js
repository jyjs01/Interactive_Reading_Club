const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');

function MyBookClubListAPI(request, response) {
    
    let body = "";

    request.on("data", data=>{
        body += data;
    });

    request.on("end", ()=>{

        let getID = qs.parse(body);
        let getUserID = sanitize(getID.user_id);

        // 본인이 참여중인 독서 클럽 정보 불러오기

        DB.query('SELECT * FROM BookClubMembers m LEFT JOIN BookClub b ON b.ClubID = m.ClubID WHERE UserID = ?',
            [getUserID], (error, results)=>{

            if (error) {
                console.log(error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            const bookclubs = results;

            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ success: true, bookclubs }));
        });
    });
}

module.exports = MyBookClubListAPI;