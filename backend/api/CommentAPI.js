const sanitize = require('sanitize-html');
const DB = require('../database');
const qs = require('qs');

function CommentAPI(request, response){

    let body = "";

    request.on("data", data=>{
        body += data;
    });

    request.on("end", ()=>{

        let getComment = qs.parse(body);

        let CommentID = 0;
        let getPostID = sanitize(getComment.post_id);
        let getUserID = sanitize(getComment.user_id);
        let getContent = sanitize(getComment.content);
        let getTime = sanitize(getComment.formattedTime);

        DB.query('SELECT COUNT(*) AS count FROM Comment', (error, results_count)=>{
            if (error) {
                console.log(error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            CommentID = results_count[0].count + 1;
            

            DB.query('INSERT INTO Comment VALUES (?, ?, ?, ?, ?)', 
                [CommentID, getPostID, getUserID, getContent, getTime], (error, results)=>{

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

module.exports = CommentAPI;