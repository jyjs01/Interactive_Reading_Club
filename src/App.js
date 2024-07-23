import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NonLogin from './components/NonLogin';
import LoginForm from './components/LoginForm';

function App() {
  // useEffect(() => {
  //   fetch('http://localhost:4000/')
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.error('Fetch error:', error);
  //     });
  // }, []);

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
