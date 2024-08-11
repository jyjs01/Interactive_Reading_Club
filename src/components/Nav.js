import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useUser } from '../UserContext';

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

// 상단 컨테이너
const NotificationTop = styled.div`
    display: flex;
    justify-content: center;
`;

// 중단 컨테이너
const NotificationMiddle = styled.div`
    display: flex;
    justify-content: center;
    width: inherit;
    margin : 50px 0;
`;

// 테이블
const Table = styled.table`
    width: inherit;
    font-family: "Newsreader";
    text-align: center;
    border-spacing: 0;
`;

// 행
const Tr = styled.tr`
    height: 50px;
`;

const Th = styled.th`
    width: 100px;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
`;

const Td = styled.td`
    width: 100px;
`;

// 하단 컨테이너
const NotificationBottom = styled.div`
    display: flex;
    justify-content: center;
`;

// 닫기 버튼
const ExitButton = styled.button`
    background-color: #426B1F;
    border-radius: 10px;
    color: white;
    width: 150px;
    height: 55px;
    border: transparent;
    cursor: pointer;
    font-size: 15pt;
`;

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000
    }, 
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 5px black'
    },
};

function Nav() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [bookclubs, setBookclubs] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useUser();

    const GotoMain = () => {
        navigate('/main');
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        fetch('http://localhost:4000/fetch_bookclub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                user_id: user.UserID,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setBookclubs(data.bookclubs);
                    setError(null);
                } else {
                    setError(data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching book clubs:', error);
                setError('Failed to fetch bookclubs. Please try again.');
            });
    }, [user.UserID]);


    return (
        <NavContainer>
            <TitleContainer onClick={GotoMain}>
                <Mainlogo src='/mainlogo.jpg' alt='mainlogo' />
                <MainTitle>Interactive Reading Club</MainTitle>
            </TitleContainer>
            <NotificationLogo
                src='https://cdn.icon-icons.com/icons2/1993/PNG/512/alarm_alert_attention_bell_clock_notification_ring_icon_123203.png'
                alt='notification'
                onClick={openModal}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Notification Modal"
            >
                <NotificationTop><h2>독서 클럽 일정</h2></NotificationTop>
                <NotificationMiddle>
                    <Table>
                        <thead>
                            <Tr>
                                <Th>이름</Th>
                                <Th>시작일</Th>
                                <Th>종료일</Th>
                            </Tr>
                        </thead>
                        <tbody>
                            {bookclubs.map((club, index) => (
                                club.schedules.length > 0 ? (
                                    club.schedules.map((schedule, idx) => (
                                        <Tr key={`${index}-${idx}`}>
                                            <Td>{club.clubName}</Td>
                                            <Td>{new Date(schedule.startDate).toLocaleDateString('ko-KR')}</Td>
                                            <Td>{new Date(schedule.endDate).toLocaleDateString('ko-KR')}</Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr key={index}>
                                        <Td>{club.clubName}</Td>
                                        <Td colSpan="2">No schedules available</Td>
                                    </Tr>
                                )
                            ))}
                        </tbody>
                    </Table>
                </NotificationMiddle>
                <NotificationBottom><ExitButton onClick={closeModal}>닫기</ExitButton></NotificationBottom>
            </Modal>
        </NavContainer>
    );
}

export default Nav;
