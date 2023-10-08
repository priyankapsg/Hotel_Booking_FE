import axios from "axios";
import React from "react";
import { Table } from "react-bootstrap";
import UserAvator from "../../assets/images/parson5.png";
import useFetch from "../../hooks/useFetch";
import UserModal from "./UserModal";

const DeleteBtn = ({ data, loading }) => {
  
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${data?._id}`);

      setTimeout(() => {
        window.location.reload();
      }, "2000");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button className="ms-2 btn btn-danger" onClick={handleDelete} disabled={loading}>
      Delete
    </button>
  );
};

const UsersTable = () => {

  // const [updateMode, setUpdateMode] = useState(false);

    const { data, loading, error } = useFetch(
      "http://localhost:5000/api/users"
  );
  
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4>Users Table</h4>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SL</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Hotel Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="items-center gap-2">
                  <span>{user?.name}</span>
                </td>
                <td>{user?.email}</td>
                <td>{user?.phone ? user?.phone : "Not Available"}</td>
                <td>{user?.hotelname}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersTable;
