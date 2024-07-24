import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Nav from './Nav';
import Footer from './Footer';


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
    height: 450px;
    margin: 150px 0;
`;

// 프로필 컨테이너
const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 900px;
    height: 450px;
    border: transparent;
    border-radius: 10px;
    padding: 5px;
    background-color: #EAEAEA;
    box-shadow: 0 0 5px grey;
`;

// 프로필 컨테이너
const Profile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 450px;
`;

// 이름
const Name = styled.h2`
    font-family: "Inter";
`;

// 이메일
const Email = styled.h2`
    font-family: "Inter";
`;


// 폼
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 189px;
`;

// 현재 비밀번호
const CurrentPassword = styled.input`
    width: 500px;
    border-style: none;
    border-radius: 10px;
    font-size: 15pt;
    padding: 10px;
    box-shadow: 0 0 5px grey;
`;

// 변경할 비밀번호
const ChangePassword = styled.input`
    width: 500px;
    border-style: none;
    border-radius: 10px;
    font-size: 15pt;
    padding: 10px;
    box-shadow: 0 0 5px grey;
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

// 두번째 컨테이너
const SecondContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: 800px;
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
    background-color: #EAEAEA;
    box-shadow: 0 0 5px grey;
`;

// 독서 클럽 컨테이너 상단
const BookClub_UpContainer = styled.div`
    height: 60px;
    margin: 5px;
`;

// 독서 클럽 활동 기록
const BookClub_Title = styled.h2`
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

// 리스트 
const BookClubs_List = styled.div`
    display: flex;
    justify-content: space-around;
`;

// 독서 클럽
const BookClubs = styled.div`
    width: 230px;
    height: 250px;
    background-color: white;
`;

function MyPage() {

    const [currentpassword, setCurrentPassword] = useState('');
    const [changepassword, setChangePassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:4000/change_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                currentpassword,
                changepassword
            })
        });

        const result = await response.json();

        if (result.success) {
            toast.success(result.message);          
            setTimeout(() => {
                window.location.href = '/mypage';
            }, 1500);
        } else {
            toast.error(result.message);
        }
    };

    const { user } = useUser();

    return (
        <Center>
            <MainContainer>
                <Nav />
                <FirstContainer>
                    <ProfileContainer>
                        <Profile>
                            <Name>이름 : {user._Name}</Name>
                            <Email>이메일 : {user.Email}</Email>
                            <Form onSubmit={handleSubmit}>

                                <CurrentPassword 
                                    type='password' 
                                    value={currentpassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder='현재 비밀번호 입력'
                                    required
                                />

                                <ChangePassword 
                                    type='password' 
                                    value={changepassword}
                                    onChange={(e) => setChangePassword(e.target.value)}
                                    placeholder='변경할 비밀번호 입력' 
                                    required
                                />

                                <SubmitButton type='submit' value='비밀번호 변경' />
                            </Form>
                        </Profile>
                    </ProfileContainer>
                </FirstContainer>
                <SecondContainer>
                    <BookClubContainer>
                        <BookClub_UpContainer>
                            <BookClub_Title>독서 클럽 활동 기록</BookClub_Title>
                        </BookClub_UpContainer>
                        <BookClub_DownContainer>
                            
                        </BookClub_DownContainer>
                    </BookClubContainer>
                </SecondContainer>
                <Footer />
            </MainContainer>
            <ToastContainer 
                position='top-center'
                hideProgressBar={true}  
            />
        </Center>
    )
}

export default MyPage;