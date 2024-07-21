import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NonLogin from './components/NonLogin';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NonLogin />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
