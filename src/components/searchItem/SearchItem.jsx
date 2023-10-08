import { Link } from "react-router-dom";
import DemoImg from '../../assets/images/feature5.jpg'
import "./searchItem.css";

const SearchItem = ({ item }) => {
    return (
        <div className="searchItem">
            <img src={DemoImg} alt="img" className="siImg" />
            <div className="siDesc">
                <h1 className="siTitle">{item?.name}</h1>
                <span className="siSubtitle">Studio Apartment with Air conditioning</span>
                <span className="siFeatures">{item?.desc}</span>
                <span className="siCancelOp">Free cancellation </span>
            </div>
            <div className="siDetails">
                <div className="siRating">
                    <span>Excellent</span>
                    <button>{item?.rating}</button>
                </div>
                <div className="siDetailTexts">
                    <span className="siPrice">{item?.cheapestPrice} Rupees</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="siCheckButton">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
