import React from 'react'
import './Navbar.scss'

const Navbar = () => {
    return (
        <header className='header'>
            <a href="/" className="logo">Bus Factor</a>
            <nav className="navbar">
                <a href="/">Link 1</a>
                <a href="/">Link 2</a>
                <a href="/">Link 3</a>
            </nav>
        </header>
    )
}

export default Navbar