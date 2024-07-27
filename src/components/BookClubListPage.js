import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useUser } from '../UserContext'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    margin-top: 30px;
`;

// 독서 클럽 참여 방법
const HowtoJoin = styled.h2`
    font-family: "Inter";
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
    margin-left: ${(props) => props.id === 'modal' ? '0px' : '20px'};
`;

// Description
const Description = styled.h3`
    font-family: "Inter";
    margin-left: ${(props) => props.id === 'modal' ? '0px' : '20px'};
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
const ButtonContainer = styled.div`
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


function BookClubListPage() {

    const [bookclubs, setBookclubs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const bookclubsPerPage = 5;
    const [selectedBookclub, setSelectedBookclub] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        fetch('http://localhost:4000/arrange_bookclub')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setBookclubs(data.bookclubs);
                    setError(null); // Clear previous errors
                    setCurrentPage(1);
                }
            })
            .catch(error => {
                console.error('Error fetching book clubs:', error);
                setError('Failed to fetch bookclubs. Please try again.');
            });
    }, []);

    const indexOfLastBook = currentPage * bookclubsPerPage;
    const indexOfFirstBook = indexOfLastBook - bookclubsPerPage;
    const currentBookClubs = bookclubs.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(bookclubs.length / bookclubsPerPage);

    const handleBookClubClick = (club) => {
        setSelectedBookclub(club);
    };

    const handleCloseModal = () => {
        setSelectedBookclub(null);
    };


    const handleJoinBookClub = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/join_bookclub', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({    
                    user_id: user.UserID,                 
                    club_id: selectedBookclub.ClubID
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
    };

    return (
        <Center>
            <MainContainer>
                <Nav />
                <BookClubContainer>
                    <HowtoJoin>원하는 독서 클럽 클릭 시 참여 가능합니다.</HowtoJoin>
                    <BookClubList>
                        {currentBookClubs.map((club) => (
                            <BookClubItem key={club.ClubID} onClick={() => handleBookClubClick(club)}>
                                <BookPicture src={club.ImageUrl} alt="Book" />
                                <BookClubInfo>
                                    <ClubName>이름: {club.ClubName}</ClubName>
                                    <Description>설명: {club._Description}</Description>
                                </BookClubInfo>
                            </BookClubItem>
                        ))}
                    </BookClubList>
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
                                <Warning>참여하시겠습니까?</Warning>
                                <ButtonContainer>
                                    <ModalButton onClick={handleJoinBookClub}>참여</ModalButton>
                                    <ModalButton onClick={handleCloseModal}>닫기</ModalButton>
                                </ButtonContainer>
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

export default BookClubListPage;