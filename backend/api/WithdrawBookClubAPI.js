const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');

function WithdrawBookClubAPI(request, response) {

    console.log('WithdrawBookClubAPI called');
    
    let body = "";

    request.on("data", data => {
        body += data;
        console.log('Receiving data:', data);
    });

    request.on("end", () => {
        console.log('Data received:', body);

        let getID = qs.parse(body);
        console.log('Parsed data:', getID);

        let getClubID = sanitize(getID.club_id);
        let getUserID = sanitize(getID.user_id);

        console.log('Sanitized data - ClubID:', getClubID, 'UserID:', getUserID);

        DB.query('DELETE FROM BookClubMembers WHERE ClubID = ? AND UserID = ?', [getClubID, getUserID], (error, results) => {
            if (error) {
                console.error('Database error:', error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            console.log('Delete operation results:', results);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ success: true, message: '처리되었습니다.' }));
        });
    });

}

module.exports = WithdrawBookClubAPI;