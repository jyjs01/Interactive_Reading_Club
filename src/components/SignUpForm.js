import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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


function SignUpForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:4000/signup_process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                email,
                password,
                repassword,
                name
            })
        });

        const result = await response.json();

        if (result.success) {
            toast.success(result.message);
            // 성공 시 리다이렉션
            setTimeout(() => {
                window.location.href = '/login';
            }, 3000); // 3초 후 리다이렉션
        } else {
            toast.error(result.message);
        }
    };

    return (
        <MainContainer>
            <SignUpContainer>
                <Form onSubmit={handleSubmit}>

                    <Input type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='이메일 입력'
                        required 
                    />

                    <Input type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='비밀번호 입력'
                        required 
                    />

                    <Input type='password'
                        value={repassword}
                        onChange={(e) => setRepassword(e.target.value)}
                        placeholder='비밀번호 확인'
                        required 
                    />

                    <Input type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='이름 입력'
                        required 
                    />

                    <SubmitButton type='submit' value="회원가입" />
                </Form>
            </SignUpContainer>
            <ToastContainer 
                position='top-center'
                hideProgressBar={true}          
            />
        </MainContainer>
    )
}

export default SignUpForm;