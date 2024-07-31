const sanitize = require('sanitize-html');
const DB = require('../database');
const qs = require('qs');

function FetchCommentAPI(request, response) {

    let body = "";

    request.on("data", data=>{
        body += data;
    });

    request.on("end", ()=>{

        let getInfo = qs.parse(body);

        let getPostID = sanitize(getInfo.post_id);

        DB.query('SELECT * FROM Comment WHERE PostID = ?', [getPostID], (error, results)=>{
            if (error) {
                console.log(error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            const comments = results;

            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ success: true, comments }));
        })
    });
}

module.exports = FetchCommentAPI;