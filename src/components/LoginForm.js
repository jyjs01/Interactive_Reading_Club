import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 메인컨테이너
const MainContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EDEDED;
`;

// 로그인 컨테이너
const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 900px;
    height: 600px;
    background-color: #BACBB2;
    border-color: #EDEDED;
    border-radius: 10px;
    box-shadow: 0 0 5px grey;
`;

// 폼
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 300px;
`

// 아이디 비밀번호 입력
const Input = styled.input`
    width: 500px;
    background-color: #EDEDED;
    border-style: none;
    border-radius: 10px;
    font-size: 15pt;
    padding: 10px;
`;

// 제출 버튼
const SubmitButton = styled.input`
    background-color: #426B1F;
    border-radius: 10px;
    color: white;
    width: 227px;
    height: 64px;
    border: transparent;
    cursor: pointer;
    font-size: 15pt;
`;

// 회원가입 버튼
const GotoSignUpButton = styled.button`
    background-color: #426B1F;
    border-radius: 10px;
    color: white;
    width: 227px;
    height: 64px;
    border: transparent;
    cursor: pointer;
    font-size: 15pt;
`;


function LoginForm() {

    const navigate = useNavigate();

    const GotoSignUp = () => {
        navigate('/signup');
    }

    return (
        <MainContainer>
            <LoginContainer>
                <Form action='http://localhost:4000/login_process' method='POST'>
                    <Input type='text' name='email' placeholder='이메일 입력' />
                    <Input type='password' name='password' placeholder='비밀번호 입력' />
                    <SubmitButton type='submit' value="로그인" />
                </Form>
                <GotoSignUpButton onClick={GotoSignUp}>회원가입</GotoSignUpButton>
            </LoginContainer>
        </MainContainer>
    )
}

export default LoginForm;