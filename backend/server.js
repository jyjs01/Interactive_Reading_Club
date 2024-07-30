const http = require('http');
const url = require('url');
const Login = require('./api/LoginAPI');
const SignUp = require('./api/SignUpAPI');
const ChangePassword = require('./api/ChangePasswordAPI');
const CreateBookClub = require('./api/CreateBookClubAPI');
const ArrangeBookClub = require('./api/BookClubListAPI');
const ArrangeMyBookClub = require('./api/MyBookClubListAPI');
const JoinBookClub = require('./api/JoinBookClubAPI');
const WithdrawBookClub = require('./api/WithdrawBookClubAPI');
const EditBookClub = require('./api/EditBookClubAPI');
const FetchDate = require('./api/FetchDate');
const FetchPost = require('./api/FetchPostAPI');


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
    

    // 회원가입

    if(pathname === '/signup_process' && request.method === 'POST') SignUp(request, response);


    // 비밀번호 변경

    if(pathname === '/change_password' && request.method === 'POST') ChangePassword(request, response);

    
    // 독서 클럽 생성

    if(pathname === '/create_bookclub' && request.method === 'POST') CreateBookClub(request, response);


    // 독서 클럽 목록

    if((pathname === '/arrange_bookclub' || pathname === '/mainarrange_bookclub') && request.method === 'GET') 
        ArrangeBookClub(request, response);

    if(pathname === '/arrange_mybookclub' && request.method === 'POST') ArrangeMyBookClub(request, response);

    // 독서 클럽 일정 가져오기

    if(pathname === '/fetch_date' && request.method === 'POST') FetchDate(request, response);

    // 독서 클럽 참여

    if(pathname === '/join_bookclub' && request.method === 'POST') JoinBookClub(request, response);

    
    // 독서 클럽 탈퇴

    if(pathname === '/withdraw_bookclub' && request.method === 'POST') WithdrawBookClub(request, response);


    // 독서 클럽 수정

    if(pathname === '/edit_bookclub' && request.method === 'POST') EditBookClub(request, response);


    // 게시글 목록

    if(pathname === '/arrange_post' && request.method === 'GET') FetchPost(response);

});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});