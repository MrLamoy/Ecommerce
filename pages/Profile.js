import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Profile() {
  const { user } = useContext(UserContext);
  console.log(user);

  const [details, setDetails] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (typeof data.user._id !== 'undefined') {
          setDetails(data.user);
        } else if (data.error === 'User not found') {
          Swal.fire({
            title: 'User not found',
            icon: 'error',
            text: 'Something went wrong, kindly contact us for assistance.',
          });
        } else {
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'Something went wrong, kindly contact us for assistance.',
          });
        }
      });
  }, []);

  // Wrap the JSX in a function or assignment
  const renderProfile = () => {
    return (
      <>
        <Row>
          <Col className="p-5 bg-primary text-white">
            <h1 className="my-5 ">Profile</h1>
            <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
            <hr />
            <h4>Contacts</h4>
            <ul>
              <li>Email: {details.email}</li>
              <li>Mobile No: {details.mobileNo}</li>
            </ul>
          </Col>
        </Row>
      </>
    );
  };

  // Use the rendered JSX
  return user.id === null ? <Navigate to="/courses" /> : renderProfile();
}
