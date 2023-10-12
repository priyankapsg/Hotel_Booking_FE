import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import HotelModal from './partyModal';
import { toast } from 'react-toastify';

const Party = () => {

  const [fetch, setFetch] = useState(false);
  const [data, setData] = useState(); 
  
  useEffect(() => {
    getHalls(); 
  }, [fetch])  

  const DeleteBtn = async (data) => {
      try {
        await axios.delete(`http://localhost:5000/api/hotels/${data?._id}`);
        toast.success("Party Hall deleted successfully");            
        setFetch(true);
      } catch (err) {
        console.log(err);
      }
  };


const getHalls = async () => {
    await axios.get(`http://localhost:5000/api/hotels?type=party_hall`)
    .then((res) => {
    setData(res?.data);
    })
  }  

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Party Halls Table</h4>
          <HotelModal btnName='Add Party Hall' addHotel={true} />
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
            {data?.length > 0 && data?.map((hotel, index) => {
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
                    />
                    <button
                    className="ms-2 btn btn-danger"
                    onClick = { () => DeleteBtn(hotel)}                    
                    >
                    Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
};

export default Party;