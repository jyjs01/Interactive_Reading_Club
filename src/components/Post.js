import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Nav from './Nav';

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
    width: 850px;
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
    height: 200px;
    box-shadow: 0 0 3px grey;
    border-radius: 10px;
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

function Post() {

    const location = useLocation();
    const { state } = location;
    const club = state?.club || {};
    const post = state?.post || {};
    const [writter, setWritter] = useState('');
    const [error, setError] = useState(null);

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
                    setError(null); // Clear previous errors
                }
            })
            .catch(error => {
                console.error('Error fetching writter:', error);
                setError('Failed to fetch writter. Please try again.');
            });
    }, []);

    return (
        <Center>
            <MainContainer>
                <Nav />
                <FirstContainer>
                    <PostContainer>
                        <UpContainer>
                            <PostTitle>제목 : {post.Title}</PostTitle>
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
                            <Comment>
                                <Left>
                                    <CommentWritter>test</CommentWritter>
                                    <CommentSection>~~~</CommentSection>
                                </Left>
                                <Right>
                                    <CommentDate>2024-07-29 21:43</CommentDate>
                                </Right>
                            </Comment>
                        </DownContainer>
                    </CommentContainer>
                </SecondContainer>
            </MainContainer>
        </Center>
    )
}

export default Post;