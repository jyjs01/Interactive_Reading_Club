const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');

function SignUpAPI(request, response) {
    let body = "";

    request.on('data', data => {
        body += data;
    });

    request.on('end', () => {
        let getLogin = qs.parse(body);

        let UserID = 0;
        let getEmail = sanitize(getLogin.email);
        let getPassword = sanitize(getLogin.password);
        let getRePassword = sanitize(getLogin.repassword);
        let getName = sanitize(getLogin.name);


        // UserID 갱신

        DB.query('SELECT COUNT(*) AS count FROM User', (error, results) => {
            if (error) {
                console.log(error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            UserID = results[0].count + 1;


            // 이메일 존재 여부

            DB.query('SELECT Email FROM User WHERE Email = ?', [getEmail], (error_email, results_email) => {
                if (error_email) {
                    console.log(error_email);
                    response.writeHead(500, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ success: false, message: 'Database error' }));
                    return;
                }

                if (results_email.length !== 0) {
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ success: false, message: '입력한 이메일이 이미 존재합니다.' }));
                    return;
                }


                // 비밀번호 존재 여부

                DB.query('SELECT _Password FROM User WHERE _Password = ?', [getPassword], (error_password, results_password) => {
                    if (error_password) {
                        console.log(error_password);
                        response.writeHead(500, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify({ success: false, message: 'Database error' }));
                        return;
                    }

                    if (results_password.length !== 0) {
                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify({ success: false, message: '입력한 비밀번호가 이미 존재합니다.' }));
                        return;
                    }



                    // 비밀번호 확인이 일치하지 않는다면

                    if (getPassword !== getRePassword) {
                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify({ success: false, message: '비밀번호 확인이 일치하지 않습니다.' }));
                        return;
                    }


                    
                    // 회원정보 등록

                    DB.query('INSERT INTO User (UserID, Email, _Password, _Name) VALUES (?, ?, ?, ?)', [UserID, getEmail, getPassword, getName], (error, results) => {
                        if (error) {
                            console.log(error);
                            response.writeHead(500, { 'Content-Type': 'application/json' });
                            response.end(JSON.stringify({ success: false, message: 'Database error' }));
                            return;
                        }

                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify({ success: true, message: '회원가입이 성공적으로 완료되었습니다.' }));
                    });
                });
            });
        });
    });
}

module.exports = SignUpAPI;
