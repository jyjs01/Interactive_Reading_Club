const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');

function AddBookAPI(request, response) {

    let body = "";

    request.on("data", data=>{
        body += data;
    });

    request.on("end", ()=>{

        let getInfo = qs.parse(body);

        let getClubID = sanitize(getInfo.club_id);
        let getImageURL = sanitize(getInfo.image_url);
        let getBookID = sanitize(getInfo.book_id);
        let getTitle = sanitize(getInfo.book_title);
        let getAuthor = sanitize(getInfo.book_author);
        let getISBN = sanitize(getInfo.book_isbn);
        let getSummary = sanitize(getInfo.book_summary);

        const query_url = "UPDATE BookClub SET ImageURL = ?, BookID = ? WHERE ClubID = ?";
        const query_add = "INSERT INTO Book VALUES (?, ?, ?, ?, ?)";

        DB.query(query_add, [getBookID, getTitle, getAuthor, getISBN, getSummary], (error, results_add)=>{
            if (error) {
                console.log(error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }
            
            DB.query(query_url, [getImageURL, getBookID, getClubID], (error, results_url)=>{
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

module.exports = AddBookAPI;
