import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import NonLogin from './components/NonLogin';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import MainPage from './components/MainPage';
import MyPage from './components/MyPage';
import CreateBookClubPage from './components/CreateBookClubPage';
import SearchBookPage from './components/SearchBookPage';
import BookDetailPage from './components/BookDetailPage';
import BookClubListPage from './components/BookClubListPage';
import ManageBookClub from './components/ManageBookClub';

function App() {

  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<NonLogin />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path='/main' element={<MainPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/create_bookclub" element={<CreateBookClubPage />} />
            <Route path='/searchbook' element={<SearchBookPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path='/bookclublist' element={<BookClubListPage />} />
            <Route path='/manage_bookclub' element={<ManageBookClub />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
