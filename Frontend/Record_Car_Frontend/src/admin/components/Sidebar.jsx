import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <span className="menu-title">Admin Dashboard</span>
            <i className="mdi mdi-home menu-icon"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
