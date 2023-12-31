import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import HamburgurIcon from "../../assets/icons/hamburgur.svg";
import './sideBar.scss';

const SideBar = ({ menuOpen, setMenuOpen }) => {

const navigate = useNavigate();  
const handleLogout = () => {
  sessionStorage.clear();
  navigate("/"); 
}

  return (
    <div className={`side-bar ${menuOpen && "active"}`}>
      <div>
        <div className="logo-panel">
          <Link
            to="/admin/dashboard"
            className="text-decoration-none fs-5 fw-bold text-white" >
            Admin Dashboard
          </Link>
          <img
            src={HamburgurIcon}
            alt={HamburgurIcon}
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer"
          />
        </div>
        <div className="main-menu">
          <Link to="/admin/dashboard" className="main-menu-link">
            Dashborad
          </Link>
          <Link to="/admin/dashboard/users" className="main-menu-link">
            Users
          </Link>
          <Link to="/admin/dashboard/hotels" className="main-menu-link">
            Hotels
          </Link>
          <Link to="/admin/dashboard/party_hall" className="main-menu-link">
            Party Halls
          </Link>
        </div>
      </div>
      <div className="bottom-link">
        <button className="login-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;