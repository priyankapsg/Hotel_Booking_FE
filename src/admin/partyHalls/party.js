import axios from 'axios';
import React from 'react';
import { Table } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import HotelModal from './partyModal';


const DeleteBtn = ({ data, loading, reFetch }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/hotels/${data?._id}`);
      reFetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      className="ms-2 btn btn-danger"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? "Loading" : "Delete"}
    </button>
  );
};


const Party = () => {

      const { data, loading, reFetch, error } = useFetch(`http://localhost:5000/api/hotels?type=party_hall`);
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
                      loading={loading}
                      reFetch={reFetch}
                      btnName="Edit"
                    />
                    <DeleteBtn
                      data={hotel}
                      loading={loading}
                      reFetch={reFetch}
                    />
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