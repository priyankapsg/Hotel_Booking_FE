import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import "./list.css";

const List = () => {

  const location = useLocation();
  const [destination, setDestination] = useState(location?.state?.destination);
  const [date, setDate] = useState(location?.state?.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location?.state?.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(`http://localhost:5000/api/hotels?city=${destination}`);

  const handleClick = () => {
      reFetch();
  };

  return (
      <div>
          <Navbar />
          <Header type="list" />
          <div className="listContainer">
              <div className="listWrapper">
                  <div className="listResult">
                      {loading ? (
                          "loading"
                      ) : (
                          <>
                              {data?.map((item) => (
                                  <SearchItem item={item} key={item._id} />
                              ))}
                          </>
                      )}
                  </div>
              </div>
          </div>
      </div>
  );
};

export default List;
