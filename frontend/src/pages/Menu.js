import React from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from '../config/axiosConfig';


const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <>
  <nav className="topnav navbar navbar-light">
    <div>
            <a
              className="navbar-brand mx-auto flex-fill text-center"
              href="./index.html"
            >
              <svg
                style={{ width: "2rem" }}
                version="1.1"
                id="logo"
                className="navbar-brand-img brand-md"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 120 120"
                xmlSpace="preserve"
              >
                <g>
                  <polygon className="st0" points="78,105 15,105 24,87 87,87 	" />
                  <polygon className="st0" points="96,69 33,69 42,51 105,51 	" />
                  <polygon className="st0" points="78,33 15,33 24,15 87,15 	" />
                </g>
              </svg>
            </a>
    </div>
    <ul className="nav">
      
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-muted pr-0"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="avatar avatar-sm mt-2">
            <img
              src="./assets/avatars/face-1.jpg"
              alt="..."
              className="avatar-img rounded-circle"
            />
          </span>
        </a>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <a className="dropdown-item" onClick={handleLogout}>
            Logout
          </a>
          
        </div>
      </li>
    </ul>
  </nav>
  <aside
    className="sidebar-left border-right bg-white shadow"
    id="leftSidebar"
    data-simplebar=""
    style={{ width: "20%", float: "left", height: "1000px"}}
  >
    <a
      href="#"
      className="btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3"
      data-toggle="toggle"
    >
      <i className="fe fe-x">
        <span className="sr-only" />
      </i>
    </a>
    <nav className="vertnav navbar navbar-light">
      {/* nav bar */}
      
      
     
      <ul className="navbar-nav flex-fill w-100 mb-2">
      <li className="nav-item w-100">
          <a className="nav-link" href="/dashboard">
            <i className="fe fe-home fe-16" />
            <span className="ml-3 item-text">Dashboard</span>
          </a>
        </li>
        <li className="nav-item w-100">
          <a className="nav-link" href="/movies">
            <i className="fe fe-layers fe-16" />
            <span className="ml-3 item-text">Movies</span>
          </a>
        </li>
       
      </ul>
    </nav>
  </aside>
  </>
  );
};

export default Menu;