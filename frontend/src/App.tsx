import React, { useContext } from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import Wallets from './pages/Wallets';
import Profile from './pages/Profile';
import AppContainer from './layout/AppContainer';
import Navbar from './components/Navbar';
import PrivateRoute from './utils/PrivateRoute';

import { AuthContext, AuthContextType, AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Features from './pages/Features';
import About from './pages/About';

function App() {

  const { authTokens } = useContext(AuthContext) as AuthContextType;

  return (
    <AppContainer isLoggedIn={authTokens.accessToken == null}>
      {authTokens.accessToken ? <></> : <Navbar />}
      <Routes>
        {/* Redirect to home here if logged in */}
        <Route element={<PrivateRoute loggedIn={false} to="home" />}>
          <Route path="" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path='features' element={<Features />} />
          <Route path='about' element={<About />} />
        </Route>
        {/* Redirect to login if NOT logged in */}
        <Route element={<PrivateRoute loggedIn={true} to="login" />}>
          <Route path='home' element={<Home />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="wallets" element={<Wallets />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
