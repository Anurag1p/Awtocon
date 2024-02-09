import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { auth } from "../firebase";


const SubNavbar = () => {

  const logout = async () => {
    try {
      await auth.signOut();
      Navigate('/')
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Your Brand</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={`/subcontractor/home`}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-nav">
          <button
            className="btn  my-2 my-sm-0 btn-sm"
            type="submit"
            onClick={logout}
            style={{ color: "tan", border: "1px solid tan" }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default SubNavbar;
