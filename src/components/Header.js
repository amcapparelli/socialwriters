import React  from 'react';
import  { LogoutButton } from '../utils/logout-button';
import './Header.css';

export const Header = () => 
    <header>
        <h1> <a href="/">Social Writers</a> </h1>
        <span>A Social Network for Writers</span>
        <LogoutButton  />
    </header>

  
export default Header