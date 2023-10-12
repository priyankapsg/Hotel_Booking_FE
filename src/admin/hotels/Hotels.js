import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import HotelModal from './HotelModal';
import { toast } from 'react-toastify';

const Hotels = () => {

const [fetch, setFetch] = useState(false);
const [data, setData] = useState();
  
useEffect(() => {
  getHotels(); 
}, [fetch])

const DeleteBtn = async (data) => {
    try {
      await axios.delete(`http://localhost:5000/api/hotels/${data?._id}`);
      toast.success("Hotel deleted successfully");            
      setFetch(true);
    } catch (err) {
      console.log(err);
    }
};

const getHotels = async () => {
  await axios.get(`http://localhost:5000/api/hotels?type=hotel`)
  .then((res) => {
  setData(res?.data);
  })
}


return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Hotels Table</h4>
          <HotelModal btnName='Add Hotel' addHotel={true} />
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Address</th>
              <th>Rating</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.length && data.map((hotel, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="items-center">
                    <span>{hotel?.name}</span>
                  </td>
                  <td>{hotel?.address ? hotel?.address : "Not Available"}</td>
                  <td>{hotel?.rating ? hotel?.rating : "Not Available"}</td>
                  <td>{hotel?.cheapestPrice}</td>
                  <td className="d-flex">
                    <HotelModal
                      data={hotel}
                      btnName="Edit"
                      setFetch={setFetch}
                    />
                    <button
                    className="ms-2 btn btn-danger"
                    onClick = { () => DeleteBtn(hotel)}
                    
                    >
                    Delete
                    </button>
                    {/* <DeleteBtn
                      data={hotel}
                      btnName="Delete"
                      setFetch={setFetch}
                    /> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
};

export default Hotels;