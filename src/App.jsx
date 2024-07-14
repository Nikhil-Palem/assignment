import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/header/Navbar';
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import Products from './components/Products'; 
import Home from './Home';
import ConfirmEmail from './components/Confirm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");

  const handleLogin = (id, username) => {
    setIsLoggedIn(true);
    setUserId(id);
    setUserName(username);
  };
console.log(import.meta.env.REACT_APP_BACKEND_URL);
  return (
    <Router>
      <div className="app">
        <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path="/signup" element={isLoggedIn ? <Products /> : <Signup Signup={handleLogin} />} />

          <Route path="/signin" element={isLoggedIn ? <Products /> : <SignIn SignIn={handleLogin} />} />

          <Route path="/products" element={<Products />} />
          <Route path='/confirm-email' element={<ConfirmEmail/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
