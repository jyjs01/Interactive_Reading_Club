import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../UserContext'; 
import Nav from './Nav';
import Footer from './Footer';


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

// 메인사진
const MainPicture = styled.img`
    width: inherit;
    height: 600px;
`;

// 내용 컨테이너
const SectionContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: inherit;
    height: 900px;
    margin-bottom: 50px;
`;

// 독서 클럽 컨테이너
const BookClubContainer = styled.div`
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

// 독서 클럽 컨테이너 상단
const BookClub_UpContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin: 5px;
`;

// 독서 클럽 수정
const Title = styled.h1`
    font-family: "Inter";
    margin-left: 20px;
`;

// 독서 클럽 컨테이너 하단
const BookClub_DownContainer = styled.div`
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
const Description = styled.textarea`
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

function EditBookClubPage() {

    const navigate = useNavigate();
    const [bookclub_name, setBookclub_name] = useState('');
    const [bookclub_description, setBookclub_description] = useState('');
    const [bookclub_start, setBookclub_start] = useState('');
    const [bookclub_end, setBookclub_end] = useState('');
    const { user } = useUser();

    const handleEditBookClub = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/edit_bookclub', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({    
                    user_id: user.UserID,                 
                    bookclub_name, 
                    bookclub_description,
                    bookclub_start,
                    bookclub_end 
                }),
            });

            const result = await response.json();

            if (result.success) {
                navigate('/manage_bookclub');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('오류가 발생했습니다.');
        }
    };

    return (
        <Center>
            <MainContainer>
                <Nav />
                <SectionContainer>
                    <BookClubContainer>
                        <BookClub_UpContainer><Title>독서 클럽 수정</Title></BookClub_UpContainer>
                        <BookClub_DownContainer>
                            <Form onSubmit={handleEditBookClub}>

                                <Line>독서 클럽 이름 : 
                                    <Input 
                                        type='text' 
                                        name='bookclub_name'
                                        value={bookclub_name}
                                        onChange={(e) => setBookclub_name(e.target.value)}
                                        required
                                    />
                                </Line>

                                <Line>독서 클럽 설명 : 
                                    <Description 
                                        name='bookclub_description'
                                        value={bookclub_description}
                                        onChange={(e) => setBookclub_description(e.target.value)}
                                        required
                                    />
                                </Line>

                                <Line id='start'>독서 클럽 시작일 : 
                                    <Input 
                                        type='date' 
                                        name='bookclub_start'
                                        value={bookclub_start}
                                        onChange={(e) => setBookclub_start(e.target.value)}
                                        required
                                    />
                                </Line>
                                
                                <Line id='end'>독서 클럽 종료일 : 
                                    <Input 
                                        type='date' 
                                        name='bookclub_end'
                                        value={bookclub_end}
                                        onChange={(e) => setBookclub_end(e.target.value)}
                                        required
                                    />
                                </Line>

                                <SubmitButton type='submit' value='수정' />
                            </Form>
                        </BookClub_DownContainer>
                    </BookClubContainer>
                </SectionContainer>
                <Footer />
                <ToastContainer 
                    position='top-center'
                    hideProgressBar={true}          
                />
            </MainContainer>
        </Center>
    )
}

export default EditBookClubPage;