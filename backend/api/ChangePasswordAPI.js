const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');

function ChangePasswordAPI(request, response) {

    let body = "";

    request.on("data", data=>{
        body += data;
    })

    request.on("end", ()=>{

        let getPassword = qs.parse(body);

        let getCurrentPassword = sanitize(getPassword.currentpassword);
        let getChangePassword = sanitize(getPassword.changepassword);



        DB.query("SELECT UserID, _Password FROM User WHERE _Password = ?", [getCurrentPassword], (error, results)=>{
            if (error) {
                console.log(error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            // 입력한 현재 비밀번호가 일치하지 않는다면

            if (results.length === 0) {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: '입력한 현재 비밀번호가 일치하지 않습니다.' }));
                return;
            } 
            

            // 비밀번호 변경
            
            else {
                DB.query("UPDATE User SET _Password = ? WHERE UserID = ?", [getChangePassword, results[0].UserID], (error, results_update)=>{
                    if (error) {
                        console.log(error);
                        response.writeHead(500, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify({ success: false, message: 'Database error' }));
                        return;
                    }

                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ success: true, message: '비밀번호가 성공적으로 변경되었습니다.' }));
                })
            }
        })
    })

}

module.exports = ChangePasswordAPI;