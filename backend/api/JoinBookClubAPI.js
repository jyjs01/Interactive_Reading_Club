const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');

function JoinBookClubAPI(request, response) {

    let body = "";

    request.on("data", data=>{
        body += data;
    })

    request.on("end", ()=>{

        let getID = qs.parse(body);

        let getUserID = sanitize(getID.user_id);
        let getClubID = sanitize(getID.club_id);

        if (isNaN(getUserID) || isNaN(getClubID)) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ success: false, message: 'Invalid input' }));
            return;
        }

        DB.query('SELECT * FROM BookClubMembers WHERE ClubID = ? && UserID = ?', [getClubID, getUserID], (error, results_select)=>{
            if (error) {
                console.log(error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            if (results_select.length === 0) {

                DB.query("INSERT INTO BookClubMembers VALUES (?, ?)", [getClubID, getUserID], (error, results_m)=>{
                    if (error) {
                        console.log(error);
                        response.writeHead(500, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify({ success: false, message: 'Database error' }));
                        return;
                    }
        
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ success: true, message: `처리되었습니다.`}));
                });

            } else {
                response.writeHead(409, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: '이미 참여중입니다.' }));
                return;
            }
        });
    });
}

module.exports = JoinBookClubAPI;