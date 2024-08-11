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
const FetchPost = require('./api/FetchPostAPI');
const WritePost = require('./api/WritePostAPI');
const FetchWritter = require('./api/FetchWritterAPI');
const FetchComment = require('./api/FetchCommentAPI');
const FetchCommentWritter = require('./api/FetchCommentWritterAPI');
const WriteComment = require('./api/CommentAPI');
const ArrangeNotification = require('./api/NotificationAPI');
const AddBook = require('./api/AddBookAPI');


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


    // 독서 클럽 참여

    if(pathname === '/join_bookclub' && request.method === 'POST') JoinBookClub(request, response);

    
    // 독서 클럽 탈퇴

    if(pathname === '/withdraw_bookclub' && request.method === 'POST') WithdrawBookClub(request, response);


    // 독서 클럽 수정

    if(pathname === '/edit_bookclub' && request.method === 'POST') EditBookClub(request, response);


    // 게시글 목록

    if(pathname === '/arrange_post' && request.method === 'POST') FetchPost(request, response);


    // 게시글 작성

    if(pathname === '/write_post' && request.method === 'POST') WritePost(request, response);


    // 게시글 작성자 불러오기

    if(pathname === '/fetch_postwritter' && request.method === 'POST') FetchWritter(request, response);


    // 댓글 불러오기

    if(pathname === '/fetch_comment' && request.method === 'POST') FetchComment(request, response);


    // 댓글 작성자 불러오기

    if(pathname === '/fetch_commentwritter' && request.method === 'POST') FetchCommentWritter(request, response);


    // 댓글 작성

    if(pathname === '/write_comment' && request.method === 'POST') WriteComment(request, response);


    // 독서 클럽 이름, 일정 불러오기 (알림)

    if(pathname === '/fetch_bookclub' && request.method === 'POST') ArrangeNotification(request, response);


    // 독서 클럽에 책 추가

    if(pathname === '/add_book' && request.method === 'POST') AddBook(request, response);
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});