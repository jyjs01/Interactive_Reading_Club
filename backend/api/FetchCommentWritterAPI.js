const sanitize = require('sanitize-html');
const DB = require('../database');
const qs = require('qs');

function FetchCommentWritterAPI(request, response) {

    let body = "";

    request.on("data", data=>{
        body += data;
    });

    request.on("end", ()=>{

        let getInfo = qs.parse(body);

        let getUserID = sanitize(getInfo.user_id);

        DB.query('SELECT _Name AS name FROM User WHERE UserID = ?', [getUserID], (error, results)=>{
            if (error) {
                console.log(error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            const comment_writter = results[0].name;

            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ success: true, writter }));
        });
    });
}

module.exports = FetchCommentWritterAPI;