const DB = require('../database');
const qs = require('qs');

function FetchDate(request, response) {

    let body = "";

    request.on("data", data=>{
        body += data;
    });

    request.on("end", ()=>{

        let getID = qs.parse(body);

        let getUserID = sanitize(getID.user_id);
        let getClubID = sanitize(getID.club_id);

        DB.query('SELECT StartDate, EndDate FROM ReadingSchedule WHERE ClubID = ? AND UserID = ?',
            [getClubID, getUserID], (error, results)=>{

                if (error) {
                    console.log(error);
                    response.writeHead(500, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ success: false, message: 'Database error' }));
                    return;
                }

                const Dates_bookclub = results;

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: true, Dates_bookclub }));
            }
        )
    })
}

module.exports = FetchDate;