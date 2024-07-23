import React from 'react';
import styled from 'styled-components';

// 비로그인 네비게이션
const NonLoginnav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: inherit;
  height: 150px;
`;

// 타이틀컨테이너
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  cursor: default;
`;

// 제목
const MainTitle = styled.div`
  font-size: 40pt;
  font-weight: 500;
  font-family: "Newsreader";
  white-space: nowrap;
  color: #426B1F;
  margin-left: 10px;
`;

// 로고
const Mainlogo = styled.img`
  width: 50px;
  height: 50px;
  margin : 15px;
`;

// 사이트 설명
const GotoExplain = styled.h2`
  font-family: "Inter";
  cursor: pointer;
  margin-right: 100px;
  background: linear-gradient(45deg, #EDEDED, white);
  padding: 20px;
`;

function NonLoginNav() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
      <NonLoginnav>
        <TitleContainer>
          <Mainlogo src='/mainlogo.jpg' alt='mainlogo' />
          <MainTitle>Interactive Reading Club</MainTitle>
        </TitleContainer>
        <GotoExplain onClick={scrollToBottom}>WHAT IS IRC?</GotoExplain>
      </NonLoginnav>      
  );
}
  
export default NonLoginNav;
  