import React from 'react';
import { Outlet } from 'react-router-dom';
// import './assets/index.css'; 
import Navbar from './Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet /> {/* This will render the current route's component */}
      </div>
    </div>
  );
};

export default App;