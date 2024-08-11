import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

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

// 내용 컨테이너
const SectionContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: inherit;
    height: 615px;
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

// 프로필
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
    height: 259px;
    margin-top: 50px;
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

function MyPage() {

    const [currentpassword, setCurrentPassword] = useState('');
    const [changepassword, setChangePassword] = useState('');
    const { user } = useUser();
    const navigate = useNavigate();

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
                navigate('/login');
            }, 1500);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <Center>
            <MainContainer>
                <Nav />
                <SectionContainer>
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
                </SectionContainer>
            </MainContainer>
            <ToastContainer 
                position='top-center'
                hideProgressBar={true}  
            />
        </Center>
    )
}

export default MyPage;