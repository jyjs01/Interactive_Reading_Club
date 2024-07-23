import React from 'react';
import styled from 'styled-components';

// 네비게이션 컨테이너
const NavContainer = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: inherit;
    height: 150px;
`;

// 타이틀 컨테이너
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 50px;
    cursor: pointer;
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

// 알림 아이콘
const NotificationLogo = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 65px;
    cursor: pointer;
`;

function Nav() {

    return (
        <NavContainer>
            <TitleContainer>
                <Mainlogo src='/mainlogo.jpg' alt='mainlogo' />
                <MainTitle>Interactive Reading Club</MainTitle>
            </TitleContainer>
            <NotificationLogo src='https://cdn.icon-icons.com/icons2/1993/PNG/512/alarm_alert_attention_bell_clock_notification_ring_icon_123203.png' alt='notification' />
        </NavContainer>
    )
}

export default Nav;