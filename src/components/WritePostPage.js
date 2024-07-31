import React, { useState } from 'react';
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
    height: 865px;
    margin-top: 50px;
`;

// 게시글 컨테이너
const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 1250px;
    height: 700px;
    border: transparent;
    border-radius: 10px;
    padding: 5px;
    background-color: #E0D3D3;
    box-shadow: 0 0 5px grey;
`;

// 게시글 컨테이너 상단
const Post_UpContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin: 5px;
`;

// 독서 클럽 생성
const Title = styled.h1`
    font-family: "Inter";
    margin-left: 30px;
`;

// 독서 클럽 컨테이너 하단
const Post_DownContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 600px;
`;

// 폼
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 600px;
`;

const Line = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 15pt;
    font-weight: 570;
    font-family: "Inter";
    width: ${(props) => props.id === 'start' || props.id === 'end' ? '500px' : '980px'};
`;

// 입력
const Input = styled.input`
    width: ${(props) => props.type === 'date' ? '200px' : '700px'};
    background-color: #EDEDED;
    border-style: none;
    border-radius: 10px;
    font-size: 17pt;
    font-weight: 550;
    padding: 10px;
`;

// 설명
const Content = styled.textarea`
    width: 700px;
    height: 300px;
    background-color: #EDEDED;
    border-style: none;
    border-radius: 10px;
    font-size: 17pt;
    font-weight: 570;
    padding: 10px;
`;

// 제출 버튼
const SubmitButton = styled.input`
    background-color: #426B1F;
    border-radius: 10px;
    color: white;
    width: 180px;
    height: 58px;
    border: transparent;
    cursor: pointer;
    font-size: 15pt;
`;

function WritePostPage() {

    const location = useLocation();
    const { state } = location;
    const club = state?.club || {};
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useUser();

    const currentTime = new Date();
    const offset = currentTime.getTimezoneOffset(); // UTC와의 차이를 분 단위로 반환

    // 로컬 시간으로 변환
    currentTime.setMinutes(currentTime.getMinutes() - offset);

    // MySQL DATETIME 형식에 맞게 포맷팅
    const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');
    

    const handleWritePost = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/write_post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ 
                    club_id: club.ClubID,   
                    user_id: user.UserID,                 
                    title, 
                    content,
                    formattedTime
                }),
            });

            const result = await response.json();

            if (result.success) {
                navigate(`/bookclub/${club.ClubName}`, {state: {club}});
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('오류가 발생했습니다.');
        }
    }

    return (
        <Center>
            <MainContainer>
                <Nav />
                <FirstContainer>
                    <PostContainer>
                        <Post_UpContainer><Title>게시글 작성</Title></Post_UpContainer>
                        <Post_DownContainer>
                            <Form onSubmit={handleWritePost}>

                                <Line>제목 :
                                    <Input
                                        type='text'
                                        name='post_title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </Line>

                                <Line>내용 :
                                    <Content
                                        name='post_title'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    />
                                </Line>

                                <SubmitButton type='submit' value='작성' />
                            </Form>
                        </Post_DownContainer>
                    </PostContainer>
                </FirstContainer>
                <ToastContainer 
                    position='top-center'
                    hideProgressBar={true}          
                />
            </MainContainer>
        </Center>
    )
}

export default WritePostPage;