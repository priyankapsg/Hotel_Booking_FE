import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const HotelModal = ({ data, loading, reFetch, btnName, addHotel }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editData, setEditData] = useState(data);

  const [info, setInfo] = useState({})


  const handleCreate = async (e) => {
    e.preventDefault();
    const hotelInfo = {
      ...info, type: 'party_hall',
    };  
    try {
      await axios.post(`http://localhost:5000/api/hotels`,hotelInfo);
      handleClose();
      // reFetch();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      toast.success("Party Hall created successfully");            
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateHotel = {
      name: editData?.name,
      city: editData?.city,
      address: editData?.address,
      desc: editData?.desc,
      rating: editData?.rating,
      price: editData?.cheapestPrice
    };

    try {
      await axios.put(`http://localhost:5000/api/hotels/${editData?._id}`,updateHotel);
      handleClose();
      // reFetch()
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      toast.success("Party Hall updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    if (addHotel) {
      setInfo((prevData) => ({
        ...prevData,
        [name]: value?.toLowerCase(),
      }));
    } else {
       setEditData((prevData) => ({
           ...prevData,
           [name]: value?.toLowerCase(),
       }));
    }
  };

  return (
    <>
      <Button variant={addHotel ? "primary" : "warning"} onClick={handleShow}>
        {btnName}
      </Button>

      <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{addHotel ? "Create" : "Edit"} Party Hall</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addHotel ? handleCreate : handleUpdate}>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="name"
                  label="Hall Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter hotel Name ... "
                    value={addHotel ? info?.name : editData?.name}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="city" label="City" className="mb-3">
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="Enter city Name ... "
                    value={addHotel ? info?.city : editData?.city}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="address"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter  Address ... "
                    value={addHotel ? info?.address : editData?.address}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
            <FloatingLabel
              controlId="desc"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                type="text-area"
                name="desc"
                placeholder="Enter Description ... "
                height={300}
                value={addHotel ? info?.desc : editData?.desc}
                onChange={handleChange}
              />
            </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel controlId="rating" label="Rating">
                  <Form.Select
                    aria-label="Rating"
                    name="rating"
                    value={addHotel ? info?.rating : editData?.rating}
                    onChange={handleChange}
                  >
                    <option>Select Rating</option>
                    <option value={5}>5 Star</option>
                    <option value={4}>4 Star</option>
                    <option value={3}>3 Star</option>
                    <option value={2}>2 Star</option>
                    <option value={1}>1 Star</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="cheapestPrice"
                  label="Price"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    name="cheapestPrice"
                    placeholder="Enter Description ... "
                    height={300}
                    value={
                      addHotel ? info?.cheapestPrice : editData?.cheapestPrice
                    }
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <button type="submit" className="headerBtn banner-btn mt-3 w-100">
              {addHotel ? "Create" : "UPDATE"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HotelModal;