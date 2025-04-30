import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul >
        <li><Link to="/recipes">Home (Recipes)</Link></li>
        <li><Link to="/recipes/create">Create Recipe</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;