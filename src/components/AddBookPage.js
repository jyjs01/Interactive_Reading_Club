import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

// 내용 컨테이너
const SectionContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: inherit;
    height: 1200px;
    margin-bottom: 50px;
`;

// 독서 클럽 컨테이너
const BookClubContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 1250px;
    height: 900px;
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
    height: 700px;
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
    height: 200px;
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
    width: 928px;
    padding: 30px 30px 30px 0;
`;

// ClubName
const ClubName = styled.h2`
    font-family: "Inter";
    margin-left: ${(props) => props.id === 'modal' ? '0px' : '20px'};
`;

// Description
const Description = styled.h3`
    font-family: "Inter";
    margin-left: ${(props) => props.id === 'modal' ? '0px' : '20px'};
    word-wrap: break-word;
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

// 모달 스타일
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000
    },
    content: {
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '20px',
        width: '600px',
        maxHeight: '80%',
        overflowY: 'auto',
        margin: 'auto',
        boxShadow: '0 0 5px black'
    }
};

// 모달 내용
const ModalSection = styled.div`
    display: flex;
    flex-direction: column;
    width: inherit;
    align-items: center;
    justify-content: center;
`;

// 경고메시지
const Warning = styled.h1`
    font-family: "Inter";
    margin-top: 50px;
`;

// 버튼 컨테이너
const ModalButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: inherit;
    position: absolute;
    bottom: 20px;
`;

// 모달 버튼
const ModalButton = styled.button`
    background-color: #426B1F;
    border-radius: 10px;
    color: white;
    width: 190px;
    height: 50px;
    border: transparent;
    cursor: pointer;
    font-size: 15pt;
`;


function AddBookPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const { book } = location.state || {};
    const { user } = useUser();
    const [bookclubs, setBookclubs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBookclub, setSelectedBookclub] = useState(null);
    const bookclubsPerPage = 3;
    const indexOfLastBook = currentPage * bookclubsPerPage;
    const indexOfFirstBook = indexOfLastBook - bookclubsPerPage;
    const currentBookClubs = bookclubs.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(bookclubs.length / bookclubsPerPage);
    

    useEffect(() => {
        fetch('http://localhost:4000/arrange_mybookclub', {
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
                    setCurrentPage(1);
                }
            })
            .catch(error => {
                console.error('Error fetching book clubs:', error);
            });
    }, []);

    const handleCloseModal = () => {
        setSelectedBookclub(null);
    };

    const GotoBookClub = (club) => {
        navigate(`/bookclub/${club.ClubName}`, { state: { club }});
    }

    const handleAddBook = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/add_book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({                  
                    club_id: selectedBookclub.ClubID,
                    image_url: book.volumeInfo.imageLinks.thumbnail,
                    book_id: book.id,
                    book_title: book.volumeInfo.title,
                    book_author: book.volumeInfo.authors?.join(', '),
                    book_isbn: book.volumeInfo.industryIdentifiers?.map(id => id.identifier).join(', '),
                    book_summary: book.volumeInfo.description
                }),
            });

            const result = await response.json();

            if (result.success) {
                handleCloseModal();
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('오류가 발생했습니다.');
        }
    }

    return (
        <Center>
            <MainContainer>
                <Nav />
                <SectionContainer>
                    <BookClubContainer>
                        <BookClub_UpContainer>
                            <Title>책 추가</Title>
                        </BookClub_UpContainer>
                        <BookClub_DownContainer>
                            <BookClubList>
                                {currentBookClubs.filter(club => club.ImageURL === null).map((club) => (
                                    <BookClubItem key={club.ClubID}>
                                        <BookPicture src={club.ImageUrl} alt="Book" onClick={() => GotoBookClub(club)} />
                                        <BookClubInfo onClick={() => GotoBookClub(club)}>
                                            <ClubName>이름: {club.ClubName}</ClubName>
                                            <Description>설명: {club._Description}</Description>
                                        </BookClubInfo>
                                        <ButtonContainer>
                                            <Button onClick={() => setSelectedBookclub(club)}>책 추가</Button>
                                        </ButtonContainer>
                                    </BookClubItem>
                                ))}
                            </BookClubList>
                        </BookClub_DownContainer>
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
                    </BookClubContainer>
                </SectionContainer>
                <Footer />

                <Modal
                    isOpen={!!selectedBookclub}
                    onRequestClose={handleCloseModal}
                    style={customStyles}
                    contentLabel="Book Club Details"
                >
                    {selectedBookclub && (
                        <>
                            <ModalSection>
                                <BookPicture src={selectedBookclub.ImageUrl} alt="Book" />
                                <ClubName id='modal'>{selectedBookclub.ClubName}</ClubName>
                                <Description id='modal'>{selectedBookclub._Description}</Description>
                                <Warning>추가하시겠습니까?</Warning>
                                <ModalButtonContainer>
                                    <ModalButton onClick={handleAddBook}>추가</ModalButton>
                                    <ModalButton onClick={handleCloseModal}>닫기</ModalButton>
                                </ModalButtonContainer>
                            </ModalSection>
                        </>
                    )}
                </Modal>
                <ToastContainer 
                    position='top-center'
                    hideProgressBar={true}          
                />
            </MainContainer>
        </Center>
    )
}

export default AddBookPage;