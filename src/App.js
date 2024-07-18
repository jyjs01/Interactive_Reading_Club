import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NonLogin from './components/NonLogin';
import LoginForm from './components/LoginForm';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NonLogin />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
