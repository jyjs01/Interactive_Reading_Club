const http = require('http');
const url = require('url');
const Login = require('./api/LoginAPI');

// 서버 생성
let app = http.createServer((request,response)=>{
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;


    
    // 로그인

    if(pathname === '/login_process' && request.method === 'POST') Login(request, response);
    




    
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});