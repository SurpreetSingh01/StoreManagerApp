import React from 'react';
import { NavLink } from 'react-router-dom';
//import './Navbar.css'; // optional if you want to style active link

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <span className="navbar-brand">React</span>
            <div className="navbar-nav">
                <NavLink to="/customers" className="nav-link">Customers</NavLink>
                <NavLink to="/products" className="nav-link">Products</NavLink>
                <NavLink to="/stores" className="nav-link">Stores</NavLink>
                <NavLink to="/sales" className="nav-link">Sales</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
