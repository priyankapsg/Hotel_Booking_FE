import axios from 'axios';
import React, { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
   });

const navigate = useNavigate();

   const handleChange = (e) => {
       setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
   };

const handleSubmit = async (e) => {
       e.preventDefault();

       try {
           const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
           if (res?.status === 200) {
            sessionStorage.setItem("userInfo", JSON.stringify(res?.data?.details));
            navigate("/admin/dashboard");
           } else {
            toast.error("Please check your username and password and try again");            
           }
       } catch (err) {
        toast.error("Please check your username and password and try again");
       }
};

  return (
      <div className="">
          <div className="login-section">
              <div className="container">
                  <div className="row">
                      <div className="d-flex justify-content-center align-items-center vh-100">
                          <div className="p-5 login-form login-form-wrapper shadow-lg rounded-3 w-50">
                              <div className="text-center">
                                  <div className="field-wrapper">
                                      <h3 className="my-4">Login Form</h3>

                                      <form onSubmit={handleSubmit}>
                                          <FloatingLabel controlId="email" label="Email" className="mb-3">
                                              <Form.Control type="email" placeholder="Enter Your Name ... " onChange={handleChange} />
                                          </FloatingLabel>

                                          <FloatingLabel controlId="password" label="Password" className="mb-3">
                                              <Form.Control type="password" placeholder="Enter Your user name ... " onChange={handleChange} />
                                          </FloatingLabel>

                                          <button type="submit" className="headerBtn banner-btn mt-3 w-100">
                                              Login
                                          </button>
                                      </form>

                                      <p className="ff-inter text-clr-dark-3 fs-14 lh-22 mt-4">
                                          Don't have an account?{" "}
                                          <Link to="/registration" className="signup-btn fw-semiBold">
                                              Sign up
                                          </Link>
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Login;