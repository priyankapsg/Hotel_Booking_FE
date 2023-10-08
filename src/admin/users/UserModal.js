import axios from "axios";
import React, { useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";

const UserModal = ({data }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [editData, setEditData] = useState(data);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const updateCurrentUser = {
      name: editData?.name,
      username: editData?.username,
      email: editData?.email,
      password: editData?.password,
      address: editData?.address,
      phone: editData?.phone,
      isAdmin: editData?.isAdmin,
    };

    try {
      await axios.put(`http://localhost:5000/api/users/${editData?._id}`,updateCurrentUser);
      handleClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
};

  const handleUpdateChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
};


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div>
            </div>
            <Row>
              <Col>
                <FloatingLabel controlId="name" label="Name" className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Your Name ... "
                    value={editData?.name}
                    onChange={handleUpdateChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="userName"
                  label="User Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter Your user name ... "
                    value={editData?.username}
                    onChange={handleUpdateChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel controlId="email" label="Email" className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Your Name ... "
                    value={editData?.email}
                    onChange={handleUpdateChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
              <FloatingLabel controlId="phone" label="Phone" className="mb-3">
                  <Form.Control
                    type="phone"
                    name="phone"
                    placeholder="Enter Your phone number ... "
                    value={editData?.phone}
                    onChange={handleUpdateChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <FloatingLabel controlId="address" label="Address" className="mb-3">
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter Your Address ... "
                value={editData?.address}
                onChange={handleUpdateChange}
              />
            </FloatingLabel>

            <button type="submit" className="headerBtn banner-btn mt-3 w-100">
              UPDATE
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserModal;
