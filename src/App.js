import React, { useEffect } from 'react';
import NonLogin from './components/NonLogin';

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
      <NonLogin />
    </div>
  );
}

export default App;
