import React, { useState,useRef, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import AuthContext from '../Store/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from './firebase'

const LoginPage = () => {
const emailref=useRef();
const passwordRef=useRef();
const [isLoading,setLoading]=useState(false)
const atx=useContext(AuthContext)

  

  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
     const email=emailref.current.value;
     const password=passwordRef.current.value;
     //with firebase
      createUserWithEmailAndPassword(auth,email,password).then(
        userCredential=>{
          const user=userCredential.user
          console.log(user)
        }
      ).catch(error=>{
        console.log(error.message)
      })







     //with firebase end here
    //  let url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0an-iOy1im1Cjd3_OhzCjGooPUxdc7Es"
    //  try{

    //       const response=await axios.post(url,{
    //         email:email,
    //         password:password,
    //         returnSecureToken:true
    //       });
    //       const data=response.data;     
    //       if(response.status===200){
    //        console.log("login success");
    //        console.log("token=",data.idToken)
    //        atx.login(data.idToken)
           
    //       }
    //       else{
    //         throw new Error('Authntication failed!!!')
    //       }

    //  }
    //  catch(error){
    //   alert(error.message)

    //  }
     emailref.current.value="";
     passwordRef.current.value="";
     setLoading(false)

  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="bg-light p-5" style={{ minWidth: 300 }}>
        <h2 className="mb-4">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  ref={emailref} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"  ref={passwordRef} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;
