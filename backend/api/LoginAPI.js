const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');

function LoginAPI(request, response) {


    // LoginForm 으로부터 입력받은 값 가져오기

    let body = "";

    request.on('data', data=>{
        body += data;
    });
    


    // 가져온 값 비교 및 후처리

    request.on('end', ()=>{
        let getLogin = qs.parse(body);

        let getEmail = sanitize(getLogin.email);
        let getPassword = sanitize(getLogin.password);


        // 입력한 이메일 패스워드가 등록되어 있는지 확인 및 처리

        DB.query('SELECT Email, _Password FROM User WHERE Email = ? AND _Password = ?', [getEmail, getPassword], (error, results, fields)=>{
            if (error) {
                console.log(error);
            }

            if(results.length === 0){
                response.writeHead(302, { 'Location': 'http://localhost:3000/login' });
                response.end();
            } else {
                response.writeHead(302, { 'Location': 'http://localhost:3000/' });
                response.end();
            }

            DB.end((err) => {
                if (err) {
                    console.error('Error ending the DB:', err.stack);
                    return;
                }
                console.log('Connection ended');
            });
        });

    });
}

module.exports = LoginAPI;