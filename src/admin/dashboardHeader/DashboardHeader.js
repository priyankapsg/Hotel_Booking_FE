
import React from 'react';
import HamburgurIcon from "../../assets/icons/light-hamburgur.svg";
import './dashboardHeader.scss';

const DashboardHeader = ({ menuOpen, setMenuOpen }) => {

const username = sessionStorage.getItem('username');

  return (
    <nav className="nav-bar">
      <div className="left-item">
        {!menuOpen && (
          <div
            className="cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img src={HamburgurIcon} alt={HamburgurIcon} />
          </div>
        )}
      </div>
      <div className="right-item">
      <div className="text-success text-decoration-none fw-bold">{username}</div>
      </div>
    </nav>
  );
};

export default DashboardHeader;