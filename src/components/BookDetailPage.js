import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
    min-height: 1200px;
    background-color: #FCFCFC;
    border-radius: 10px;
    box-shadow: 0 0 5px grey;
    padding: 8px;
    margin: 15px;
`;

// 책 상세 정보
const BookDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    background-color: #F2EAEA;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

// 책 사진
const BookPicture = styled.img`
    width: 300px;
    height: 400px;
`;

// BookID, 제목, 저자, ISBN, 설명
const BookID = styled.h2`
    font-family: "Inter";
    margin: 10px 0;
`;

const Title = styled.h1`
    font-family: "Inter";
    margin: 10px 0;
`;

const Author = styled.h2`
    font-family: "Inter";
    margin: 10px 0;
`;

const ISBN = styled.h2`
    font-family: "Inter";
    margin: 10px 0;
`;

const Summary = styled.h4`
    font-family: "Inter";
    margin: 10px 0;
    white-space: pre-wrap;
`;

// 맨 위 컨테이너
const InforContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 900px;
`;

// 버튼 컨테이너
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: inherit;
    margin-top: 150px;
`;

// 독서 클럽에 책 추가
const InsertBookClubButton = styled.button`
    background-color: #426B1F;
    border-radius: 10px;
    color: white;
    width: 227px;
    height: 55px;
    border: transparent;
    cursor: pointer;
    font-size: 15pt;
`;

function BookDetailPage() {
    const location = useLocation();
    const { book } = location.state || {}; // 전달된 책 정보 받기
    const navigate = useNavigate();

    if (!book) {
        return <div>No book details available</div>;
    }

    const handleBookClubClick = () => {
        navigate(`/list_bookclub/${book.id}`, { state: {book}});
    }

    return (
        <Center>
            <MainContainer>
                <Nav />
                <BookDetailContainer>
                    <InforContainer>
                        <BookID>ID : {book.id}</BookID>
                        <ISBN>ISBN : {book.volumeInfo.industryIdentifiers?.map(id => id.identifier).join(', ')}</ISBN>
                    </InforContainer>
                    {book.volumeInfo.imageLinks?.thumbnail && (
                        <BookPicture src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                    )}
                    <Title>{book.volumeInfo.title}</Title>
                    <Author>{book.volumeInfo.authors?.join(', ')}</Author>
                    <Summary>{book.volumeInfo.description}</Summary>

                    <ButtonContainer>
                        <InsertBookClubButton onClick={handleBookClubClick}>독서 클럽에 책 추가</InsertBookClubButton>
                    </ButtonContainer>
                </BookDetailContainer>
            </MainContainer>
        </Center>
    );
}

export default BookDetailPage;
