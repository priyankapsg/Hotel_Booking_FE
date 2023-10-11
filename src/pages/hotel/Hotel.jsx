import {
    faCircleArrowLeft,
    faCircleArrowRight,
    faCircleXmark,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BookingModal from "../../components/bookingModal/BookingModal";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import useSearch from "../../hooks/useSearch";
import "./hotel.css";
import logo from '../../assets/images/residential1.jpg';

const Hotel = () => {

   const {id} = useParams();
   const { data, loading, error } = useFetch(`http://localhost:5000/api/hotels/find/${id}`);

  return (
      <div>
          <Navbar />
          <Header type="list" />
          <div className="hotelContainer">
              <div className="hotelWrapper">
                  <div className="d-flex justify-content-between align-items-center">
                      <h1 className="hotelTitle">{data?.name}</h1>
                      <BookingModal data={data} />
                  </div>
                  <div className="hotelAddress">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span>{data?.address}</span>
                  </div>
                    <span className="siPrice">{data?.cheapestPrice} INR</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                  <div className="hotelImages">
                          <div className="hotelImgWrapper">
                              <img src={logo} alt="img" className="hotelImg" />
                          </div>
                  </div>
                  <div className="hotelDetails">
                      <div className="hotelDetailsTexts">
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Hotel;
