import './App.css';
import './style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header';
import Login from './components/layouts/Login';
import Footer from './components/layouts/Footer';
import Home from './components/products/Home';
import React, {  } from 'react';
import Profile from './components/users/Profile';
function App() {

  return (
    <>
      <div className="App">
        <Router>
        <Header />
          <Routes>
            <Route path='/' element={<Home></Home>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/home' element={<Footer></Footer>}/>
            <Route path='/myprofile' element={<Profile></Profile>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
