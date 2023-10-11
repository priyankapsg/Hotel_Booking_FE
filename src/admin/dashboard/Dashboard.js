import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import SideBar from '../sideBar/SideBar';

const Dashboard = () => {

  const [menuOpen, setMenuOpen] = useState(true);
  const [hotelCount, setHotelCount] = useState('');
  const [hallCount, setHallCount] = useState('');
  const { data } = useFetch("http://localhost:5000/api/users");

useEffect(() => {
   hotelC();
   hallC();
}, [])
  
  
const hotelC = ( async () => {
 await axios.get(`http://localhost:5000/api/hotels?type=hotel`)
 .then((res) => {
  setHotelCount(res?.data?.length)
 }) 
}) 

const hallC = ( async () => {
 await axios.get(`http://localhost:5000/api/hotels?type=party_hall`)
 .then((res) => {
  setHallCount(res?.data?.length)
 }) 
}) 



  return (
    <>
      <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className={`dashboard-wrapper ${!menuOpen && "active"}`}>
        <DashboardHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="dashboard-container">
          <h2 className="mb-3">Dashboard</h2>
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-5">
            <div
              className="featured-card d-flex gap-4 rounded shadow p-4 flex-wrap"
              style={{ width: "32%" }}
            >
              <img
                src="https://img.freepik.com/free-icon/user_318-792327.jpg"
                alt="icon"
                className="rounded-circle"
                width={40}
                height={40}
              />
              <div>
                <h5>Total Users</h5>
                <h6>{data?.length}</h6>
              </div>
            </div>
            <div
              className="featured-card d-flex gap-4 rounded shadow p-4 flex-wrap"
              style={{ width: "32%" }}
            >
              <img
                src="https://www.carbontanzania.com/wp-content/uploads/2017/01/CT_Buy_Home-500x500.jpg"
                alt="icon"
                className="rounded-circle"
                width={40}
                height={40}
              />
              <div>
                <h5>Total Hotels</h5>
                <h6>{hotelCount}</h6>
              </div>
            </div>
            <div
              className="featured-card d-flex gap-4 rounded shadow p-4 flex-wrap"
              style={{ width: "32%" }}
            >
              <img
                src="https://sustainabletravel.org/wp-content/uploads/Carbon-Neutral-Hotel-Stays-Icon-256px.png"
                alt="icon"
                className="rounded-circle"
                width={40}
                height={40}
              />
              <div>
                <h5>Total Party Halls</h5>
                <h6>{hallCount}</h6>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;