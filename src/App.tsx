import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './auth/Login';
function App() {
  const handleLogin = () => {
    // Redirect the user to the server-side login route
    window.location.href = 'http://localhost:4000/auth/google';
  };


  useEffect(() => {

    fetch("http://localhost:4000/", {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)

      })
      .catch(error => {
        console.error('Error:', error);
      });

  }, []);

  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
