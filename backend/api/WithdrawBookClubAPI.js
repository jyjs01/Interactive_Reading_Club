const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');

function WithdrawBookClubAPI(request, response) {

    let body = "";

    request.on("data", data=>{
        body += data;
    });

    request.on("end", ()=>{

        let getID = qs.parse(body);

        let getClubID = sanitize(getID.club_id);
        let getUserID = sanitize(getID.user_id);


        DB.query('DELETE FROM BookClubMembers WHERE ClubID = ? AND UserID = ?', [getClubID, getUserID], (error, results_delmember)=>{
            if (error) {
                console.log(error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            DB.query('DELETE FROM ReadingSchedule WHERE ClubID = ?', [getClubID], (error, results_delete)=>{
                if (error) {
                    console.log(error);
                    response.writeHead(500, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ success: false, message: 'Database error' }));
                    return;
                }

                

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: true, message: '처리되었습니다.' }));
            })

        })
    });

}

module.exports = WithdrawBookClubAPI;