import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import Wallets from './pages/Wallets';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="home" element={<Home />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="wallets" element={<Wallets />} />
      <Route path="reports" element={<Reports />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
