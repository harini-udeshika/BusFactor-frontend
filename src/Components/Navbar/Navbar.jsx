import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className='header'>
            <Link to="/" className="logo">Bus Factor</Link>
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/completed-tasks">Completed Tasks</Link>
                <Link to="/">Sample</Link>
            </nav>
        </header>
    );
}

export default Navbar;
