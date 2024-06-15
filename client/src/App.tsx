import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useUserContext } from './userContext';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import BookSearchPage from './components/BookSearchPage';

function App() {
  const { user } = useUserContext();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='*' element={<HomePage />} />
        <Route path='/books' element={<BookSearchPage />} />
        {
          !user && (
            <>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
            </>
          )
        }
      </Routes>
    </div>
  );
}

export default App;
