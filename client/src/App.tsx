import React from 'react';
import './App.css';
import { Routes } from 'react-router-dom';
import { useUserContext } from './userContext';
import Navbar from './components/Navbar';

function App() {
  const { user } = useUserContext();
  return (
    <div>
      <Navbar />
      <Routes>

      </Routes>
    </div>
  );
}

export default App;
