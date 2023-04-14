
import React, { useState,useRef, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import AuthContext from '../Store/AuthContext';
import { Link, useHistory } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase/firebase'

const LoginPage = () => {
const emailref=useRef();
const passwordRef=useRef();
const confirmpasswordRef=useRef();
const [isLoading,setLoading]=useState(false)
const [isLogin,setIsLogin]=useState(true)
const [passwordmismatch,setPasswordMisMatch]=useState(false)
const [isSignUp,setSignUp]=useState(false)
const atx=useContext(AuthContext)
const history=useHistory();


const onSwithAuthorizationModeHandler=()=>{
  setIsLogin((prevState)=>!prevState)
}


  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
     const email=emailref.current.value;
     const password=passwordRef.current.value;
    //  let url;
    //  if(isLogin){
    //     url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0an-iOy1im1Cjd3_OhzCjGooPUxdc7Es"
    //  }
    //  else{
    //   url= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0an-iOy1im1Cjd3_OhzCjGooPUxdc7Es';
    //   const confirmPassword=confirmpasswordRef.current.value;
    //   if(password!=confirmPassword){
    //       setPasswordMisMatch(true)
    //   }

         
    //  }
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
    //        if(!isLogin){
    //         setIsLogin(true)
    //         history.replace('./login')
    //        }
    //        else{
    //        atx.login(data.idToken)
    //        history.replace('/dashboard')
                    
    //        }
           
    //       }
    //       else{
    //         throw new Error('Authntication failed!!!')
    //       }

    //  }
    //  catch(error){
    //   alert(error.message)

    //  }
    //  emailref.current.value="";
    //  passwordRef.current.value="";
    //  setLoading(false)

//WITH FIREBASE AUTH
    if(isLogin){
           signInWithEmailAndPassword(auth,email,password)
          .then(usercredential=>{
            const user=usercredential.user;
            console.log(user)
            const details={
              name:user.displayName,
              email:user.email,
              imageURL:user.photoURL

            }
            atx.login(user.accessToken,details)
            history.replace('/profile')
          }).catch(error=>{
            console.log(error)
          })
        }
    
    if(!isLogin){
      const confirmPassword=confirmpasswordRef.current.value;
      if(password!=confirmPassword){
             setPasswordMisMatch(true)
           }

      createUserWithEmailAndPassword(auth,email,password)
      .then(usercredential=>{
        const user=usercredential.user;
        console.log(user)
      
      }).catch(error=>{
        console.log(error)
      })
    }
    //WITH FIREBASE AUTH ENDS HERE
  
  setLoading(false)
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mb-3rem border-shadow-2px" style={{ minHeight: '100vh' }}>
      <div className="bg-light p-5" style={{ minWidth: 300 }}>
       
        <Form onSubmit={handleSubmit} className='mb-3rem'>
          <Form.Group controlId="formBasicEmail" className='mb-3'>
             <h4>{isLogin ?'Login':'SignUp'}</h4>
           
            <Form.Control type="email" placeholder="Enter email"  ref={emailref} required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className='mb-3'>          
            <Form.Control type="password" placeholder="Password"  ref={passwordRef} required/>
          </Form.Group>
           {!isLogin &&  <Form.Group controlId="formBasicPassword" className='mb-3'>          
            <Form.Control type="Password" placeholder="Confirm Password"  ref={confirmpasswordRef} required/>
          </Form.Group>}
          {passwordmismatch &&<p color='red'>Enter Correct password...</p>}
          {!isLoading && <Button variant="primary" type="submit" >
            {isLogin?'Login':'Signup'}
           
          </Button>}
          <div>
           {!isLoading && isLogin && <a href='#forgot'>Forgot password? </a>
           
            }
             </div>
          {isLoading && <p color='green'>Sending Request</p>}
          
           
        </Form>
        <div>
          <p> {isLogin?'Create New Account.':'Have an  Account?'}
          <Button variant="Link" onClick={onSwithAuthorizationModeHandler}>
              {isLogin?'SignUp':'Login'}
          </Button></p>
          </div>        
      </div>
      
         
    </Container>
  );
};

export default LoginPage;
