import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import styled from 'styled-components';
import Nav from './Nav';
import Footer from './Footer';

// 배경
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

// 상단 컨테이너
const UpContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: inherit;
    height: 450px;
`;

// 프로필 컨테이너
const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 320px;
    height: 350px;
    border: transparent;
    border-radius: 10px;
    padding: 5px;
    background-color: #EAEAEA;
    box-shadow: 0 0 5px grey;
`;

// 이름
const Name = styled.div`
    font-family: "Inter";
    font-weight: 570;
`;

// 내 정보 가기
const GotoMyPageButton = styled.button`
    background-color: #426B1F;
    border-radius: 10px;
    color: white;
    width: 227px;
    height: 55px;
    border: transparent;
    cursor: pointer;
    font-size: 15pt;
`;

// 로그아웃
const LogoutButton = styled.button`
    background-color: #426B1F;
    border-radius: 10px;
    color: white;
    width: 227px;
    height: 64px;
    border: transparent;
    cursor: pointer;
    font-size: 15pt;
`;

// 책 컨테이너
const BookContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 350px;
    border: transparent;
    border-radius: 10px;
    padding: 5px;
    background-color: #EAEAEA;
    box-shadow: 0 0 5px grey;
`;

// 책 검색 버튼
const SearchBook = styled.button`
    background-color: #426B1F;
    border-radius: 10px;
    color: white;
    width: 190px;
    height: 100px;
    border: transparent;
    cursor: pointer;
    font-size: 15pt;
`;

// 하단 컨테이너
const BottomContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: 800px;
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
    background-color: #EAEAEA;
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

// 독서 클럽 목록
const BookClub_Title = styled.h2`
    flex: 0.8;
    font-family: "Inter";
    margin-left: 20px;
`;

// 독서 클럽 관련 버튼들
const BookClubButton = styled.button`
    background-color: #426B1F;
    border-radius: 10px;
    color: white;
    width: 190px;
    height: 50px;
    border: transparent;
    cursor: pointer;
    font-size: 15pt;
`;


// 독서 클럽 컨테이너 하단
const BookClub_DownContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 600px;
`;

// 리스트 
const BookClubs_List = styled.div`
    display: flex;
    justify-content: space-around;
`;

// 독서 클럽
const BookClubs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 230px;
    height: 250px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 5px grey;
`;

// 책 사진
const BookPicture = styled.img`
    width: 150px;
    height: 180px;
`;

// 독서 클럽 이름
const ClubName = styled.h2`
    font-family: "Inter";
`;


function groupItems(items, groupSize){
    const result = [];
    for (let i = 0; i < items.length; i += groupSize) {
        result.push(items.slice(i, i + groupSize));
    }
    return result;
};


function MainPage() {

    const navigate = useNavigate();

    const GotoMyPage = () => {
        navigate('/mypage');
    }

    const Logout = () => {
        navigate('/login', { replace : true });
    }

    const GotoSearchBook = () => {
        navigate('/searchbook');
    }

    const GotoCreateBookClub = () => {
        navigate('/create_bookclub');
    }

    const GotoBookClubList = () => {
        navigate('/bookclublist');
    }

    const GotoManageBookClub = () => {
        navigate('/manage_bookclub');
    }

    const { user } = useUser();


    const [bookclubs, setBookclubs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/mainarrange_bookclub')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setBookclubs(data.bookclubs);
                }
            })
            .catch(error => {
                console.error('Error fetching book clubs:', error);
            });
    }, []);

    const groupedBookclubs = groupItems(bookclubs, 4);  
    const visibleGroups = groupedBookclubs.slice(0, 2);
    

    return (
        <Center>
            <MainContainer>
                <Nav />
                <MainPicture src='./mainthema.jpg' alt='mainthema' />
                <UpContainer>
                    <ProfileContainer>
                        <Name>{user._Name} 님</Name>
                        <GotoMyPageButton onClick={GotoMyPage}>내 정보</GotoMyPageButton>
                        <LogoutButton onClick={Logout}>로그아웃</LogoutButton>
                    </ProfileContainer>
                    <BookContainer>
                        <SearchBook onClick={GotoSearchBook}>책 검색</SearchBook>
                    </BookContainer>
                </UpContainer>
                <BottomContainer>
                    <BookClubContainer>
                        <BookClub_UpContainer>
                            <BookClub_Title>독서 클럽 목록</BookClub_Title>
                            <BookClubButton onClick={GotoCreateBookClub}>독서 클럽 생성</BookClubButton>
                            <BookClubButton onClick={GotoManageBookClub}>독서 클럽 관리</BookClubButton>
                            <BookClubButton onClick={GotoBookClubList}>목록 더보기</BookClubButton>
                        </BookClub_UpContainer>
                        <BookClub_DownContainer>
                            {visibleGroups.map((group, index) => (
                                <BookClubs_List key={index}>
                                    {group.map(club => (
                                        
                                        <BookClubs key={club.ClubID}>
                                            <BookPicture src={club.ImageURL} alt="Book" />
                                            <ClubName>{club.ClubName}</ClubName>
                                        </BookClubs>
                                    ))}
                                </BookClubs_List>
                            ))}
                        </BookClub_DownContainer>
                    </BookClubContainer>
                </BottomContainer>
                <Footer />
            </MainContainer>
        </Center>
    )
}

export default MainPage;