import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NonLoginNav from './NonLoginNav';

// 메인컨테이너
const MainContainer = styled.div`
  width: 100%;
`;

// 간단 소개 및 로그인 부분
const SmallSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: 500px;
`;

// 간단 소개
const Introduce = styled.div`
  font-size: 44pt;
  font-weight: 547;
  font-family: "Newsreader";
  text-align: center;
  white-space: nowrap;
  cursor: default;
  line-height: 0.6;
  margin-top: 50px;
`;

// 로그인하기
const GotoLoginButton = styled.button`
  background-color: #426B1F;
  border-radius: 10px;
  color: white;
  width: 227px;
  height: 64px;
  border: transparent;
  cursor: pointer;
  font-size: 15pt;
`;


// 사진 부분
const PictureSection = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 1000px;
`;

// 사진1
const Picture1 = styled.img`
  width: 45vw;
  height: 825px;
`;

// 사진2
const Picture2 = styled.img`
  width: 45vw;
  height: 780px;
`;

// 설명 부분
const ExplainSection = styled.div`
  width: inherit;
  height: 800px;
  padding-top: 200px;
  display: flex;
  font-family: "Inter";
`;

// 설명1
const Explain1 = styled.div`
  width: 25vw;
  font-size: 13pt;
  text-align: center;
`;

// 설명2
const Explain2 = styled.div`
  font-size: 20pt;
  width: 55vw;
`

function NonLogin() {

  const navigate = useNavigate();

  const GotoLogin = () => {
    navigate('/login');
  }
  
  return (
    <MainContainer>
      <NonLoginNav />

      <SmallSection>
        <Introduce>
          <p>책 속의 세계로 함께 떠나보세요!</p>
          <p>독서 클럽을 만들고 생각을 나눠보세요!</p>
        </Introduce>
        <GotoLoginButton onClick={GotoLogin}>Login</GotoLoginButton>
      </SmallSection>

      <PictureSection>
        <Picture1 src='/mainthema2.jpg' alt='picture1' />
        <Picture2 src='/thema3.jpg' alt='picture2' />
      </PictureSection>

      <ExplainSection>
        <Explain1><h5>소개</h5></Explain1>
        <Explain2>
          <h5>IRC?</h5>
          <p>독서 애호가들을 위한 온라인 플랫폼입니다. 이곳에서는 다양한 독서 클럽에 가입하고, 새로운 책을 발견하며, 같은 관심사를 가진 사람들과 생각을 나눌 수 있습니다.</p><br />
          <h5>IRC의 목표?</h5><br />
          <p>독서의 즐거움을 더욱 배가시키고, 책을 통해 지식을 쌓고 성장을 도모하는 커뮤니티를 형성하는 것입니다. 혼자 읽는 것보다 함께 읽을 때 더 많은 것을 배울 수 있고, 다양한 관점을 통해 사고의 폭을 넓힐 수 있습니다.</p><br />
          IRC에 가입하여 책을 사랑하는 사람들과 함께 독서의 즐거움을 나누고,
          <p>풍부한 독서 경험을 만들어가세요. 지금 바로 시작해보세요!</p>
        </Explain2>
      </ExplainSection>
    </MainContainer>
  );
}

export default NonLogin;
