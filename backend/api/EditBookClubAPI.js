const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');
const EditSchedule = require('./EditScheduleAPI');

function EditBookClubAPI(request, response) {

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


        // 독서 클럽 생성자인지 신원확인 및 ClubID 불러오기

        DB.query('SELECT ClubID AS club_id FROM BookClub WHERE OwnerID = ?', [getUserID], (error, results)=>{
            if (error) {
                console.log(error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            if (results.length === 0) {
                response.writeHead(401, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: '해당 독서 클럽 생성자가 아닙니다.' }));
                return;
            }

            ClubID = results[0].club_id;


            // 독서 클럽 수정

            DB.query('UPDATE BookClub SET ClubName = ?, _Description = ?', [getName, getDescription], (error, results_edit)=>{
                if (error) {
                    console.log(error);
                    response.writeHead(500, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ success: false, message: 'Database error' }));
                    return;
                }

                // Schedule 수정               
                EditSchedule(getStart, getEnd, ClubID);


                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: true }));
            });
        });
    });
}

module.exports = EditBookClubAPI;