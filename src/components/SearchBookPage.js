import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
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

// 책 컨테이너
const BookContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: inherit;
    height: 1000px;
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
    background-color: #F2EAEA;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 200px;
`;


function SearchBookPage() {

    return (
        <Center>
            <MainContainer>
                <Nav />
                <BookContainer>
                    <Form>
                        <SearchBook type='search' placeholder='책 이름 입력' />
                    </Form>
                    <BookList>
                        <BookItem>
                        </BookItem>
                        <BookItem>

                        </BookItem>
                    </BookList>
                </BookContainer>
                <Footer />
            </MainContainer>
        </Center>
    )
}

export default SearchBookPage;