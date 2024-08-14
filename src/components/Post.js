import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Nav from './Nav';


// 배경
const Center = styled.div`
    display: flex;
    justify-content: center;
    background-color: #EDEDED;
`;

// 메인컨테이너
const MainContainer = styled.div`
    width: 1440px;
    background-color: #FCFCFC;
    border-radius: 10px;
    box-shadow: 0 0 5px grey;
    padding: 8px;
    margin: 15px;
`;

// 첫번째 컨테이너
const FirstContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: inherit;
    margin-top: 100px;
`;

// 게시글 컨테이너
const PostContainer = styled.div`
    width: 1050px;
    height: 700px;
    border: transparent;
    border-radius: 10px;
    background-color: #F0E3E3;
    box-shadow: 0 0 5px grey;
`;

// 상단 컨테이너
const UpContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: inherit;
    border-bottom: 2px solid grey;
`;

// 게시글 제목
const PostTitle = styled.h1`
    font-family: "Newsreader";
    margin-left: 35px;
`;

// 중간 컨테이너
const MiddleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: inherit;
    border-bottom: 1px solid grey;
`;

// 게시글 작성자
const PostWritter = styled.h3`
    font-family: "Newsreader";
    margin-left: 30px;
`;

// 하단 컨테이너
const DownContainer = styled.div`
    margin : ${(props) => (props.id === 'post' ? '20px' : '0')};
    word-wrap: break-word;
`;

// 두번째 컨테이너
const SecondContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: inherit;
    margin: 100px 0;
`;

// 댓글 컨테이너
const CommentContainer = styled.div`
    width: 1050px;
    border: transparent;
    border-radius: 10px;
    background-color: #F0E3E3;
    box-shadow: 0 0 5px grey;
`;

// 댓글 컨테이너 제목
const CommentContainerTitle = styled.h2`
    font-family: "Newsreader";
    margin-left: 35px;
`;

// 댓글
const Comment = styled.div`
    display: flex;
    height: 130px;
    box-shadow: 0 0 3px grey;
    border-radius: 10px;
    margin: 10px 0; /* Add some spacing between comments */
`;

// 왼쪽 컨테이너
const Left = styled.div`
    flex: 0.85;
    display: flex;
    flex-direction: column;
`;

// 댓글 작성자
const CommentWritter = styled.h2`
    flex: 0.1;
    font-family: "Newsreader";
    margin: 10px 0 0 35px;
`;

// 댓글 내용
const CommentSection = styled.h3`
    flex: 0.9;
    font-family: "Newsreader";
    margin: 10px 10px 10px 25px;
    word-wrap: break-word;
`;

// 오른쪽 컨테이너
const Right = styled.div`
    flex: 0.15;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// 댓글 작성일자
const CommentDate = styled.h3`
    font-family: "Newsreader";
    word-wrap: break-word;
    text-align: center;
`;

// 댓글 작성 폼
const CommentForm = styled.form`
    display: flex;
    margin-top: 20px;
    align-items: center;
    height: 200px;
`;

// 입력
const Input = styled.textarea`
    flex: 0.9;
    background-color: #EDEDED;
    border-style: none;
    border-radius: 10px;
    font-size: 17pt;
    font-weight: 570;
    padding: 10px 10px 10px 0;
    margin-left: 10px;
    height: 120px;
`;

// 제출 버튼
const SubmitButton = styled.input`
    flex: 0.1;
    background-color: #426B1F;
    border-radius: 10px;
    color: white;
    width: 180px;
    height: 58px;
    border: transparent;
    cursor: pointer;
    font-size: 15pt;
    margin: 0 10px;
`;

// 페이지네이션 컨테이너
const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

// 페이지네이션 버튼
const PaginationButton = styled.button`
    background-color: #D9D9D9;
    border: none;
    border-radius: 5px;
    margin: 0 5px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #ccc;
    }
`;

function Post() {
    const location = useLocation();
    const { state } = location;
    const post = state?.post || {};
    const [writter, setWritter] = useState('');
    const [commentWritters, setCommentWritters] = useState({});
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const { user } = useUser();
    const [dependency, setDependency] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    

    const commentsPerPage = 5;
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const totalPages = Math.ceil(comments.length / commentsPerPage);



    const currentTime = new Date();
    const offset = currentTime.getTimezoneOffset(); // UTC와의 차이를 분 단위로 반환

    // 로컬 시간으로 변환
    currentTime.setMinutes(currentTime.getMinutes() - offset);

    // MySQL DATETIME 형식에 맞게 포맷팅
    const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');




    // 게시글 작성자 불러오기

    useEffect(() => {
        fetch('http://localhost:4000/fetch_postwritter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                user_id: post.UserID
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setWritter(data.writter); 
            }
        })
        .catch(error => {
            console.error('Error fetching writter:', error);
        });
    }, [post.UserID, dependency]);

    


    // 댓글 불러오기

    useEffect(() => {
        fetch('http://localhost:4000/fetch_comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                post_id: post.PostID
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setComments(data.comments);
                setCurrentPage(1);
            } 
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
    }, [post.PostID, dependency]);

    


    // 댓글 작성자 불러오기

    useEffect(() => {
        const fetchCommentWritters = async () => {
            const updatedCommentWritters = {};
            await Promise.all(comments.map(async (comment) => {
                try {
                    const response = await fetch('http://localhost:4000/fetch_commentwritter', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: new URLSearchParams({
                            user_id: comment.UserID
                        })
                    });
                    const data = await response.json();
                    if (data.success) {
                        updatedCommentWritters[comment.UserID] = data.comment_writter;
                    } else {
                        console.error(`Failed to fetch writter for user ${comment.UserID}`);
                    }
                } catch (error) {
                    console.error('Error fetching comment writter:', error);
                }
            }));
            setCommentWritters(updatedCommentWritters);
        };

        if (comments.length > 0) {
            fetchCommentWritters();
        }
    }, [comments, dependency]);



    // 댓글 쓰기
    

    const handleWriteComment = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/write_comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({    
                    post_id: post.PostID,
                    user_id: user.UserID,
                    content,
                    formattedTime
                })
            });

            const result = await response.json();

            if (result.success) {
                setContent(''); // Clear content after submission
                setDependency(prev => prev + 1); // Trigger refetch of comments
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('오류가 발생했습니다.');
        }
    };


    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <Center>
            <MainContainer>
                <Nav />
                <FirstContainer>
                    <PostContainer>
                        <UpContainer>
                            <PostTitle>{post.Title}</PostTitle>
                        </UpContainer>
                        <MiddleContainer>
                            <PostWritter>작성자 : {writter}</PostWritter>
                        </MiddleContainer>
                        <DownContainer id='post'>{post.Content}</DownContainer>
                    </PostContainer>
                </FirstContainer>
                <SecondContainer>
                    <CommentContainer>
                        <UpContainer>
                            <CommentContainerTitle>댓글</CommentContainerTitle>
                        </UpContainer>
                        <DownContainer>
                            {currentComments.length === 0 ? (
                                <p>No comments available</p>
                            ) : (
                                currentComments.map((comment) => (
                                    <Comment key={comment.CommentID}>
                                        <Left>
                                            <CommentWritter>{commentWritters[comment.UserID] || 'Loading...'}</CommentWritter>
                                            <CommentSection>{comment.Content}</CommentSection>
                                        </Left>
                                        <Right>
                                            <CommentDate>{formatDate(comment.CreatedAt)}</CommentDate>
                                        </Right>
                                    </Comment>
                                ))
                            )}
                            <PaginationContainer>
                                {[...Array(totalPages)].map((_, index) => (
                                    <PaginationButton
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        disabled={currentPage === index + 1}
                                    >
                                        {index + 1}
                                    </PaginationButton>
                                ))}
                            </PaginationContainer>
                            <CommentForm onSubmit={handleWriteComment}>
                                <Input 
                                    name='content'
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                                <SubmitButton type='submit' value='작성' />
                            </CommentForm>
                        </DownContainer>
                    </CommentContainer>
                </SecondContainer>
                <ToastContainer 
                    position='top-center'
                    hideProgressBar={true}          
                />
            </MainContainer>
        </Center>
    );
}

export default Post;