import React, { useEffect, useState } from 'react';
import './App.css';
import config from './config';
import Login from './auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './auth/Register';
import { Terms } from './auth/Terms';
import { UserDashBoard } from './dashboard/UserDashBoard';
import { NavBar } from './dashboard/nav/NavBar';
import Footer from './dashboard/nav/Footer';
import { RequireAuth } from './auth/RequireAuth';
import { UserProfile } from './components/profile/UserProfile';
import { NotFound } from './NotFound';
import { Logout } from './auth/Logout';
import { BadUser } from './components/BadUser';

export interface User {
  firstName: string;
  lastName: string;
  _id: string;
  incomingFriendRequests: Array<string>;
  outgoingFriendRequests: Array<string>;
  friends: Array<string>
};


function App() {
  const [user, setUser] = useState<User | null>(null)
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? config.development.apiUrl
      : config.production.apiUrl;

  useEffect(() => {

    fetch(`${apiUrl}`, {
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

      {user ? <NavBar user={user} /> : null}

      <Routes>
        <Route path="/" element={<RequireAuth>
          <UserDashBoard user={user} />
        </RequireAuth>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/dashboard" element={<RequireAuth>
          <UserDashBoard user={user} />
        </RequireAuth>} />
        <Route path="/user/:id" element={<RequireAuth>
          <UserProfile user={user} />
        </RequireAuth>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/usernotfound" element={<BadUser />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
