import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './auth/Register';
import { Terms } from './auth/Terms';
import { UserDashBoard } from './dashboard/UserDashBoard';
import { NavBar } from './dashboard/nav/NavBar';
import Footer from './dashboard/nav/Footer';

export interface User {
  firstName: string;
  lastName: string;
  _id: number
};


function App() {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {

    fetch("http://localhost:4000", {
      credentials: 'include',
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        setUser(data.user)

      })
      .catch(error => {
        console.error('Error:', error);
      });

  }, []);


  return (
    <BrowserRouter>
      <NavBar user={user} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/dashboard" element={<UserDashBoard user={user} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
