import React from 'react';
import styled from 'styled-components';

// 메인컨테이너
const MainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EDEDED;
`;

// 회원가입 컨테이너
const SignUpContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 900px;
    height: 700px;
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
    height: 500px;
`

// 아이디 비밀번호 입력
const Input = styled.input`
    width: 500px;
    background-color: #EDEDED;
    border-style: none;
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


function SignUpForm() {
    return (
        <MainContainer>
            <SignUpContainer>
                <Form action='http://localhost:4000/signup_process' method='POST'>
                    <Input type='text' name='email' placeholder='이메일 입력' />
                    <Input type='password' name='password' placeholder='비밀번호 입력' />
                    <Input type='password' name='repassword' placeholder='비밀번호 확인' />
                    <Input type='text' name='name' placeholder='이름 입력' />
                    <SubmitButton type='submit' value="회원가입" />
                </Form>
            </SignUpContainer>
        </MainContainer>
    )
}

export default SignUpForm;