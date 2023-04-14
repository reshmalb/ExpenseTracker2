import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import AuthContext from '../Store/AuthContext';
import axios from 'axios';
import {  updateProfile } from "firebase/auth";
import { uploadBytes,getDownloadURL,ref } from "firebase/storage";
import { auth,storage,database } from '../firebase/firebase'
import { ref as ref2,set } from "firebase/database";



const ProfileForm = () => { 
 
  const [image, setImage] = useState();
  const [name,setName]=useState();
  const [imageURL,setImageURL]=useState();
  const atx=useContext(AuthContext)

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  //  if(auth.currentUser.displayName){
  //   setName(auth.currentUser.displayName)
  //  }
  //  if(auth.currentUser.photoURL){
  //   setImageURL(auth.currentUser.photoURL)
  //  }
  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `users/${auth.currentUser.uid}/profile-picture`);
    
    // Upload the file to Firebase Storage
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        // Get the download URL of the uploaded file
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setImage(url);
            console.log("url",url)
           
            set(ref2(database, 'users/' + auth.currentUser.uid), {
              username:name,    
              email: auth.currentUser.email,
              profile_picture : image
            });

          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleSubmit =async  (e) => {
  
  e.preventDefault();
    // //let url="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD0an-iOy1im1Cjd3_OhzCjGooPUxdc7Es";
    // let url="https://identitytoolkit.googleapis.com/v1/accounts:update?key=L6ouZE6L33Y8aPFdZeUrGHOq0X02";
    // const updatedata={ 
    //   idToken:atx.token,  cd 
    //   displayName:name,
    //   photoUrl:image,
    //   returnSecureTOken:true     
   
    // }
    //   // const headers={
    //   //   'Content-Type': 'application/json'
    //   // }
    //   const headers = {
    //     'Content-Type': 'application/json',
    //    'Authorization': `Bearer ${atx.token}`,
       
    //   };
      
     
  

    // try{
    //     const response=await axios.post(url,updatedata,{headers})        
    //     const data=response.data;   
    //     console.log("data",data)  
    //    alert("Profile updated successfully")
    // }catch(error){
    //     console.log(error.message)
    // }
   
     
    updateProfile(auth.currentUser, {
      displayName: name, 
      photoURL: image
    }).then(() => {

     
        alert("profile updated successfully")
    }).catch((error) => {
    console.log(error.message)
    });




    



    
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Enter your name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Upload your profile image</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
       Update
      </Button>
    </Form>
  );
};

export default ProfileForm;