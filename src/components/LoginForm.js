import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../UserContext'; 

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
    const { setUser } = useUser(); // useUser 훅을 사용하여 setUser 함수 가져오기
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/login_process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ email, password }),
            });

            const result = await response.json();

            if (result.success) {
                // 로그인 성공 시
                setUser(result.user); // 사용자 정보 상태 업데이트
                navigate('/main'); // 성공 시 메인 페이지로 이동
            } else {
                // 로그인 실패 시
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('로그인 중 오류가 발생했습니다.');
        }
    };

    const GotoSignUp = () => {
        navigate('/signup');
    };

    return (
        <MainContainer>
            <LoginContainer>
                <Form onSubmit={handleLogin}>
                    <Input
                        type='text'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='이메일 입력'
                        required
                    />
                    <Input
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='비밀번호 입력'
                        required
                    />
                    <SubmitButton type='submit' value="로그인" />
                </Form>
                <GotoSignUpButton onClick={GotoSignUp}>회원가입</GotoSignUpButton>
            </LoginContainer>
            <ToastContainer /> {/* 토스트 메시지 */}
        </MainContainer>
    );
}

export default LoginForm;