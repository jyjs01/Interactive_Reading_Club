import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; 
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
    background-color: #FCFCFC;
    border-radius: 10px;
    box-shadow: 0 0 5px grey;
    padding: 8px;
    margin: 15px;
`;

// 첫번째 컨테이너
const FirstContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: inherit;
    margin-top: 200px;
    margin-bottom: 50px;
`;

// 게시글 컨테이너
const PostContainer = styled.div`
    width: 950px;
    height: 700px;
    border: transparent;
    border-radius: 10px;
    background-color: #E0D3D3;
    box-shadow: 0 0 5px grey;
`;

// 오른쪽 컨테이너
const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 700px;
`;

// 독서 클럽 정보 컨테이너
const BookClubInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 400px;
    height: 300px;
    border: transparent;
    border-radius: 10px;
    background-color: #E0D3D3;
    box-shadow: 0 0 5px grey;
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
    height: ${(props) => (props.height === 'post' ? '100px' : '50px')};
    box-shadow: ${(props) => (props.shadow === 'post' ? '0 0 3px grey' : '')};
    &:hover {
        background-color: ${(props) => (props.color === 'post' ? '#C1B0B0' : '')};
    }
`;

const Th = styled.th`
    border-radius: 0 10px 10px 10px;
    width: ${(props) => (props.width === 'title' ? '200px' : '100px')};
`;

// 게시글 행
const Post = styled.tbody`
    cursor: pointer;
    box-shadow: 0 0 3px grey;
`;

// 내용
const Section = styled.td`
`;

// 인원 현황 컨테이너
const BookClubMembersContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 400px;
    height: 300px;
    border: transparent;
    border-radius: 10px;
    padding: 5px;
    background-color: #E0D3D3;
    box-shadow: 0 0 5px grey;
`;

// 버튼 컨테이너
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: inherit;
    margin-bottom: 50px;
`;

// 버튼
const Button = styled.button`
    background-color: #426B1F;
    border-radius: 10px;
    color: white;
    width: 190px;
    height: 50px;
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

function BookClubPage() {
    const location = useLocation();
    const { state } = location;
    const club = state?.club || {};
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const postsPerPage = 6;
    const { user } = useUser();

    useEffect(() => {
        fetch('http://localhost:4000/arrange_post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                club_id: club.ClubID
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPosts(data.posts || []);
                    setError(null); // Clear previous errors
                    setCurrentPage(1);
                } else {
                    setError(data.message || 'Failed to fetch Posts. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error fetching Posts:', error);
                setError('Failed to fetch Posts. Please try again.');
            });
    }, [club.ClubID]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = Array.isArray(posts) ? posts.slice(indexOfFirstPost, indexOfLastPost) : [];
    const totalPages = Array.isArray(posts) ? Math.ceil(posts.length / postsPerPage) : 0;

    const navigate = useNavigate();
    const GotoPost = (post) => { 
        navigate(`/post/${post.Title}`, {state: {club, post}});
    };

    const GotoWrite = () => {
        navigate('/write_post', {state: {club}});
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <Center>
            <MainContainer>
                <Nav />
                <FirstContainer>
                    <PostContainer>
                        <Table>
                            <thead>
                                <Tr>
                                    <Th width='title'>제목</Th>
                                    <Th>작성자</Th>
                                    <Th>작성일자</Th>
                                </Tr>
                            </thead>
                            <Post>
                                {currentPosts.map(post => (                           
                                    <Tr key={post.PostID} height='post' color='post' shadow='post' onClick={() => GotoPost(post)}>
                                        <Section>{post.Title}</Section>
                                        <Section>{post.UserID}</Section>
                                        <Section>{formatDate(post.CreatedAt)}</Section>
                                    </Tr>
                                ))}
                            </Post>
                        </Table>
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
                    </PostContainer>
                    <RightContainer>
                        <BookClubInfoContainer></BookClubInfoContainer>
                        <BookClubMembersContainer></BookClubMembersContainer>
                    </RightContainer>
                </FirstContainer>
                <ButtonContainer>
                    <Button onClick={GotoWrite}>게시글 작성</Button>
                </ButtonContainer>
            </MainContainer>
        </Center>
    );
}

export default BookClubPage;