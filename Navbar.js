import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../capstone logo.png';
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css';
import { UserContext } from '../UserContext';

const Navbar = () => {
    const { user } = useContext(UserContext); // Access user state
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:8080/api/isAdmin?email=${user.email}`)
                .then(response => response.json())
                .then(data => setIsAdmin(data.isAdmin));
        }
    }, [user]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2">
            <div className="container d-flex align-items-center justify-content-between">
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <img src={logo} alt="Adventure Aware" className="navbar-logo me-2 rounded-circle" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark fw-semibold" to="/#destinations">
                                Destinations
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark fw-semibold" to="/booking">
                                Booking
                            </NavLink>
                        </li>
                        {isAdmin && (
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark fw-semibold" to="/admin">
                                    Admin
                                </NavLink>
                            </li>
                        )}
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark fw-semibold" to="/contact">
                                Contact
                            </NavLink>
                        </li>
                        {user ? (
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark fw-semibold" to="/profile">
                                    {user.name}
                                </NavLink>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark fw-semibold" to="/login">
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;