const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');

function WritePostAPI(request, response) {

    let body = "";

    request.on("data", data=>{
        body += data;
    });

    request.on("end", ()=>{

        let getPost = qs.parse(body);

        let PostID = 0;
        let getClubID = sanitize(getPost.club_id);
        let getUserID = sanitize(getPost.user_id);
        let getTitle = sanitize(getPost.title);
        let getContent = sanitize(getPost.content);
        let getCreatedAt = sanitize(getPost.formattedTime);


        // PostID 갱신

        DB.query('SELECT COUNT(*) AS count FROM Post', (error, results_count)=>{
            if (error) {
                console.log(error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            PostID = results_count[0].count + 1;


            // 게시글 작성

            DB.query('INSERT INTO Post VALUES (?, ?, ?, ?, ?, ?)', 
                [PostID, getClubID, getUserID, getTitle, getContent, getCreatedAt], (error, results_write)=>{

                if (error) {
                    console.log(error);
                    response.writeHead(500, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ success: false, message: 'Database error' }));
                    return;
                }

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: true }));
            });
        });
    });
}

module.exports = WritePostAPI;