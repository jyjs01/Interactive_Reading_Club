import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';

// 배경
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

// 책 컨테이너
const BookContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: inherit;
    
`;

// 폼
const Form = styled.form`
    width: 600px;
    display: flex;
    justify-content: center;
    background-color: #D9D9D9;
    padding: 10px;
    border-radius: 10px;
`;

// 책 검색란
const SearchBook = styled.input`
    width: 500px;
    border-style: none;
    border-radius: 10px;
    font-size: 15pt;
    padding: 10px;
    box-shadow: 0 0 5px grey;
`;

// 책 리스트
const BookList = styled.ul`
    list-style: none;
    padding: 0;
    width: 1000px;
`;

// 책
const BookItem = styled.li`
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
const BookInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

// Title
const Title = styled.h2`
    font-family: "Inter";
    margin-left: 20px;
`;

// Author
const Author = styled.h2`
    font-family: "Inter";
    margin-left: 20px;
`;

// Summary
const Summary = styled.h3`
    font-family: "Inter";
    margin-left: 20px;
`;

// 페이지네이션 컨테이너
const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

// 페이지네이션 버튼
const PaginationButton = styled.button`
    background-color: #D9D9D9;
    border: none;
    border-radius: 5px;
    margin: 0 5px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #ccc;
    }
`;


function truncate(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}

function SearchBookPage() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 5; // 페이지당 책 수 설정
    const navigate = useNavigate();

    const searchBooks = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=AIzaSyB3a88n8FjYnrKzxM1_WLlPLGq9ZUrb2Ms`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Total Items:', data.totalItems); // 전체 결과 수 확인
            setBooks(data.items || []);
            setCurrentPage(1); // Reset to the first page when new search is made
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(books.length / booksPerPage);

    const handleBookClick = (book) => {
        navigate(`/book/${book.id}`, { state: { book } });
    };

    return (
        <Center>
            <MainContainer>
                <Nav />
                <BookContainer>
                    <Form onSubmit={searchBooks}>
                        <SearchBook type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='책 이름, 저자 등 입력' 
                        />
                    </Form>
                    <BookList>
                        {currentBooks.map((book) => {
                            const imageUrl = book.volumeInfo.imageLinks?.thumbnail?.replace('&amp;', '&');
                            return (
                                <BookItem key={book.id} onClick={() => handleBookClick(book)}>
                                    {imageUrl && (
                                        <BookPicture src={imageUrl} alt={book.volumeInfo.title} />
                                    )}
                                    <BookInfo>
                                        <Title>책 제목 : {book.volumeInfo.title}</Title>
                                        <Author>저자 : {book.volumeInfo.authors?.join(', ')}</Author>
                                        <Summary>설명 : {truncate(book.volumeInfo.description || '', 200)}</Summary>
                                    </BookInfo>
                                </BookItem>
                            );
                        })}
                    </BookList>
                    <PaginationContainer>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationButton
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                disabled={currentPage === index + 1}
                            >
                                {index + 1}
                            </PaginationButton>
                        ))}
                    </PaginationContainer>
                </BookContainer>
            </MainContainer>
        </Center>
    );
}

export default SearchBookPage;