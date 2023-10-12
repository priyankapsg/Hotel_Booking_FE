import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.scss";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import bannerImg from '../../assets/images/hero-bg.png';
import useSearch from "../../hooks/useSearch";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const {dispatch} = useSearch();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    
    <>
        {type !== "list" && (
    <div className="header" style={{ backgroundImage: (type !== "list" ? `url(${bannerImg})` : '') }}>
      <div className="headerContainer">
          <>
            <h1 className="headerTitle">
              Find your perfect <br /> place to <span className="titleColor">Stay</span> 
            </h1>
          <div className="booking-wrapper">
              <div className="search-wrapper">
                <h2 className="searchTitle">Find Hotels and Party Halls</h2>
                <div className="headerSearch row">
                  <div className="col-lg-3 col-md-6 mb-lg-0 mb-3">
                    <div className="headerSearchItem headerItemBorder ">
                      <FontAwesomeIcon icon={faBed} className="headerIcon" />
                      <input
                        type="text"
                        placeholder="Where are you going?"
                        className="headerSearchInput"
                        onChange={(e) => setDestination(e.target.value?.toLowerCase())}
                      />
                    </div>
                </div>
                  <div className="col-lg-4 col-md-6 mb-lg-0 mb-3">
                    <div className="headerSearchItem headerItemBorder ">
                      <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                      <span className="headerSearchText" onClick={() => setOpenDate(!openDate)}
                      >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                        date[0].endDate,
                        "MM/dd/yyyy"
                      )}`}</span>
                      {openDate && (
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setDate([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={date}
                          className="date"
                          minDate={new Date()}
                        />
                      )}
                    </div>
                </div>
                  <div className="col-lg-2 col-md-6 mb-lg-0 mb-3">
                    <div className="searchBtnWrapper">
                      <button className="btn headerBtn searchBtn" disabled={!destination} onClick={handleSearch}>
                        Search
                      </button>
                    </div>
                 </div>
                </div>
            </div>
          </div>

          </>
      </div>
    </div>
    )}
    </>    
  
  
  )
};

export default Header;
