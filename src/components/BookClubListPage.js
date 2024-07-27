import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';

const Center = styled.div`
    display: flex;
    justify-content: center;
    background-color: #EDEDED;
`;

// 메인컨테이너
const MainContainer = styled.div`
    width: 1440px;
    min-height: 1065px;
    background-color: #FCFCFC;
    border-radius: 10px;
    box-shadow: 0 0 5px grey;
    padding: 8px;
    margin: 15px;
`;

// 독서 클럽 컨테이너
const BookClubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: inherit;
    
`;

// 독서 클럽 리스트
const BookClubList = styled.ul`
    list-style: none;
    padding: 0;
    width: 1000px;
`;

// 독서 클럽
const BookClubItem = styled.li`
    display: flex;
    background-color: #F2EAEA;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow-y: auto; // 세로 스크롤 가능
    cursor: pointer;
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
`;

function BookClubListPage() {

    return (
        <Center>
            <MainContainer>
                <Nav />
                <BookClubContainer>
                    <BookClubList>
                        <BookClubItem>
                            <BookPicture />
                            <BookClubInfo>
                                <ClubName>이름 : </ClubName>
                                <Description>설명 : </Description>
                            </BookClubInfo>
                        </BookClubItem>
                    </BookClubList>
                </BookClubContainer>
            </MainContainer>
        </Center>
    )
}

export default BookClubListPage;