import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
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

// 메인사진
const MainPicture = styled.img`
    width: inherit;
    height: 600px;
`;

// 첫번째 컨테이너
const FirstContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: inherit;
    height: 900px;
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
    background-color: #E0D3D3;
    box-shadow: 0 0 5px grey;
`;

// 독서 클럽 컨테이너 상단
const BookClub_UpContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin: 5px;
`;

// 독서 클럽 관리
const Title = styled.h1`
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

// 독서 클럽 리스트
const BookClubList = styled.ul`
    list-style: none;
    padding: 0;
`;

// 독서 클럽
const BookClubItem = styled.li`
    display: flex;
    align-items: center;
    background-color: #BACBB2;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 250px;
`;

// 책 사진
const BookPicture = styled.img`
    width: 150px;
    height: 200px;
`;

// 정보
const BookClubInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 928px;
`;

// ClubName
const ClubName = styled.h2`
    font-family: "Inter";
    margin-left: 20px;
`;

// Description
const Description = styled.h3`
    font-family: "Inter";
    margin-left: 20px;
    word-wrap: break-word;
`;

// Date
const Date = styled.h3`
    font-family: "Inter";
    margin-left: 20px;
`;

// 버튼 컨테이너
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: inherit;
`;

// 버튼
const Button = styled.button`
    background-color: #426B1F;
    border-radius: 10px;
    color: white;
    width: 150px;
    height: 55px;
    border: transparent;
    cursor: pointer;
    font-size: 15pt;
`;

function ManageBookClub() {

    return (
        <Center>
            <MainContainer>
                <Nav />
                <MainPicture src='./mainthema.jpg' alt='mainthema' />
                <FirstContainer>
                    <BookClubContainer>
                        <BookClub_UpContainer>
                            <Title>독서 클럽 관리</Title>
                        </BookClub_UpContainer>
                        <BookClub_DownContainer>
                            <BookClubList>
                                <BookClubItem>
                                    <BookPicture />
                                    <BookClubInfo>
                                        <ClubName>이름 : </ClubName>
                                        <Description>설명 : </Description>
                                        <Date>일정 : </Date>
                                    </BookClubInfo>
                                    <ButtonContainer>
                                        <Button>수정</Button>
                                        <Button>탈퇴</Button>
                                    </ButtonContainer>
                                </BookClubItem>
                            </BookClubList>
                        </BookClub_DownContainer>
                    </BookClubContainer>
                </FirstContainer>
                <Footer />
            </MainContainer>
        </Center>
    )
}

export default ManageBookClub;