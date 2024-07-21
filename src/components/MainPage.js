import React from 'react';
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
    height: 450px;
`;

// 프로필 컨테이너
const ProfileContainer = styled.div`
    width: 320px;
    height: 350px;
    border: 2px solid black;
`;

// 책 정보 컨테이너
const BookContainer = styled.div`
    width: 900px;
    height: 350px;
    border: 2px solid black;
`;

// 두번째 컨테이너
const SecondContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: 800px;
    margin-bottom: 50px;
`;

// 독서 클럽 컨테이너
const BookClubContainer = styled.div`
    width: 1250px;
    height: 700px;
    border: 2px solid black;
`;

function MainPage() {

    return (
        <Center>
            <MainContainer>
                <Nav />
                <MainPicture src='./mainthema.jpg' alt='mainthema' />
                <FirstContainer>
                    <ProfileContainer>

                    </ProfileContainer>
                    <BookContainer>

                    </BookContainer>
                </FirstContainer>
                <SecondContainer>
                    <BookClubContainer>

                    </BookClubContainer>
                </SecondContainer>
                <Footer />
            </MainContainer>

        </Center>
    )
}

export default MainPage;