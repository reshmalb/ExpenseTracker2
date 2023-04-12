import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');




  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };





  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match");
      setLoading(false);
      return;
    }
       const data={
        email:formData.email,
        password:formData.password,
        returnSecureToken:true     
       }
    try {
      const response = await fetch( 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0an-iOy1im1Cjd3_OhzCjGooPUxdc7Es',
        {method:'POST',
          body:JSON.stringify({
            email:formData.email,
            password:formData.password,
            returnSecureToken:true
          }),
          headers:{
            'Content-Type':'application/json'
          }
        })
        if(response.ok)
       {  console.log('User has successfully signed up', response);  } 
    } catch (error) {
        setErrorMessage(error.message);
    }
  
    setLoading(false);
  };
return(
 <Form onSubmit={handleSubmit}>
  {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
  <Form.Group controlId="email">
    <Form.Label>Email</Form.Label>
    <Form.Control
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      required
    />
  </Form.Group>

  <Form.Group controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control
      type="password"
      name="password"
      value={formData.password}
      onChange={handleInputChange}
      required
    />
  </Form.Group>

  <Form.Group controlId="confirmPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control
      type="password"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleInputChange}
      required
    />
  </Form.Group>

  <Button variant="primary" type="submit" disabled={loading}>
    {loading ? 'Loading...' : 'Sign Up'}
  </Button>
</Form>


)



}

export default Signup;