const http = require('http');
const url = require('url');
const Login = require('./api/LoginAPI');
const SignUp = require('./api/SignUpAPI');

// 서버 생성
let app = http.createServer((request,response)=>{
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;


    response.setHeader('Access-Control-Allow-Origin', '*'); // 모든 도메인에서 접근 가능
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    
    // 로그인

    if(pathname === '/login_process' && request.method === 'POST') Login(request, response);
    
    if(pathname === '/signup_process' && request.method === 'POST') SignUp(request, response);



    
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});