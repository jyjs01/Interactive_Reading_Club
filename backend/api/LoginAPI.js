const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');

function LoginAPI(request, response) {
    let body = "";

    request.on('data', data => {
        body += data;
    });

    request.on('end', () => {
        let getLogin = qs.parse(body);

        let getEmail = sanitize(getLogin.email);
        let getPassword = sanitize(getLogin.password);

        DB.query('SELECT Email, _Password FROM User WHERE Email = ? AND _Password = ?', [getEmail, getPassword], (error, results) => {
            if (error) {
                console.log(error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            if (results.length === 0) {
                response.writeHead(401, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: '이메일 혹은 비밀번호가 올바르지 않습니다.' }));
            } else {

                DB.query("SELECT * FROM User WHERE Email = ? AND _Password = ?", [getEmail, getPassword], (error, results_login)=>{
                    if (error) {
                        console.log(error);
                        response.writeHead(500, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify({ success: false, message: 'Database error' }));
                        return;
                    }

                    const user = results_login[0];
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ success: true, user }));
                })
            }
        });
    });
}

module.exports = LoginAPI;
