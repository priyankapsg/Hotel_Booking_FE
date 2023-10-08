import axios from 'axios';
import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useSearch from '../../hooks/useSearch';
import './bookingModal.scss';

const BookingModal = ({ data}) => {

  const [clientInfo, setClientInfo] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const {} = useFetch(`http://localhost:5000/api/hotels/room/${data?._id}`);

  const handleClick = async (e) => {
    e.preventDefault();

    console.log(clientInfo);
    const user = {
      name: clientInfo?.name,
      email: clientInfo?.email,
      phone: clientInfo?.phone,
      hotelname : data?.name
  };
    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      setShow(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <>
          <Button variant="primary" onClick={handleShow}>
              Reserve or Book Now!
          </Button>

          <Modal show={show} onHide={handleClose} size="xl" centered>
              <Modal.Body>
                  <form>
                      <div>
                          <h4>Give your contact details:</h4>
                          <FloatingLabel controlId="name" label="Name" className="mb-3">
                              <Form.Control
                                  required
                                  type="text"
                                  placeholder="Enter Your Name ... "
                                  value={clientInfo?.name}
                                  onChange={(e) => setClientInfo((prevValue) => ({ ...prevValue, name: e.target.value }))}
                              />
                          </FloatingLabel>
                          <FloatingLabel controlId="email" label="Email" className="mb-3">
                              <Form.Control
                                  required
                                  type="email"
                                  placeholder="Enter Your Name ... "
                                  value={clientInfo?.email}
                                  onChange={(e) => setClientInfo((prevValue) => ({ ...prevValue, email: e.target.value }))}
                              />
                          </FloatingLabel>
                          <FloatingLabel controlId="phone" label="Phone" className="mb-3">
                              <Form.Control
                                  required
                                  type="email"
                                  placeholder="Enter Your Name ... "
                                  value={clientInfo?.phone}
                                  onChange={(e) => setClientInfo((prevValue) => ({ ...prevValue, phone: e.target.value }))}
                              />
                          </FloatingLabel>
                      </div>
                  </form>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Close
                  </Button>
                  <Button variant="primary" onClick={handleClick}>
                      Reserve Now
                  </Button>
              </Modal.Footer>
          </Modal>
      </>
  );
};

export default BookingModal;