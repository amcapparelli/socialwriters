import React from 'react';
import { userLogout } from '../redux';
import '../utils/logout-button-style.css';


export const LogoutButton = () => 
    <button onClick={userLogout} className="logout-button">logout</button>  

export default LogoutButton