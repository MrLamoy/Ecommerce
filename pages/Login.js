import { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

import "./style.css";

export default function Login() {

  
  const { user, setUser } = useContext(UserContext);

  console.log(user);

 
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

  function authenticate(e) {

        // Prevents page redirection via form submission
        e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`,{

    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({

      email: email,
      password: password

    })
  })
  .then(res => res.json())
  .then(data => {

    // console.log(data);

    if (typeof data.access !== "undefined"){

      // Set the email of the authenticated user in the local storage
          // Syntax: localStorage.setItem('propertyName', value);
      localStorage.setItem("token", data.access);

      retrieveUserDetails(data.access);

      // alert(`You are now logged in`);
      Swal.fire({
        title: "Login successful!",
        text: "Welcome to Zuitt!",
        icon: "success"
      });
    
    } else if (data.error === "No Email Found") {

      // alert(`Email not found`);
      Swal.fire({
        title: "No email found!",
        text: "Please register first.",
        icon: "error"
      });

    } else {

      // alert(`Check your login credentials`)
      Swal.fire({
        title: "Authentication failed.",
        text: "Check your login credentials",
        icon: "error"
      });
    }
  })
  // Clear input fields after submission
  setEmail('');
  setPassword('');
    }

    const retrieveUserDetails = (token) => {

      
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
      .then(res => res.json())
      .then(data => {

        console.log(data);

        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });

      })

    }

   


  useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    return (  
        
      (user.id !== null) ? 
        <Navigate to="/products" />
      :
        <Form onSubmit={(e) => authenticate(e)}>
          <h1 className="my-5 text-center">Login</h1>
            <Form.Group controlId="userEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value={email}
              onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={password}
              onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            { isActive ? 
                <Button variant="primary" type="submit" id="submitBtn">
                    Submit
                </Button>
                : 
                <Button variant="danger" type="submit" id="submitBtn" disabled>
                    Submit
                </Button>
            }
        </Form>    
    )
}