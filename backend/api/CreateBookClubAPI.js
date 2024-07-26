const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');
const CreateSchedule = require('./ReadingScheduleAPI');

function CreateBookClub(request, response) {

    let body = "";

    request.on("data", data=>{
        body += data;
    });


    request.on("end", ()=>{

        let getBookClubInfo = qs.parse(body);

        let ClubID = 0;
        let getUserID = sanitize(getBookClubInfo.user_id);
        let getName = sanitize(getBookClubInfo.bookclub_name);
        let getDescription = sanitize(getBookClubInfo.bookclub_description);
        let getStart = sanitize(getBookClubInfo.bookclub_start);
        let getEnd = sanitize(getBookClubInfo.bookclub_end);


        // 독서 클럽 생성 과정

        DB.query('SELECT ClubName FROM BookClub', (error, results_select)=>{
            if (error) {
                console.log(error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            const clubNames = results_select.map(row => row.ClubName);

            if (clubNames.includes(getName)) {
                response.writeHead(401, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: '이름이 이미 존재합니다.' }));
                return;
            }

            // ClubID 갱신

            DB.query('SELECT COUNT(*) AS count FROM BookClub', (error, results) => {
                if (error) {
                    console.log(error);
                    response.writeHead(500, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ success: false, message: 'Database error' }));
                    return;
                }

                ClubID = results[0].count + 1;


                // 독서 클럽 생성

                DB.query('INSERT INTO BookClub VALUES (?, ?, ?, ?)', [ClubID, getName, getDescription, getUserID], (error, results_create)=>{
                    if (error) {
                        console.log(error);
                        response.writeHead(500, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify({ success: false, message: 'Database error' }));
                        return;
                    }

                    // Schedule 생성                  
                    CreateSchedule(getUserID, getStart, getEnd);


                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ success: true }));
                });
            });
        });

    });
}

module.exports = CreateBookClub;