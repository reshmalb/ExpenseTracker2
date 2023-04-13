import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import AuthContext from '../Store/AuthContext';
import axios from 'axios';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const atx=useContext(AuthContext)

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit =async  (e) => {
    let url="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD0an-iOy1im1Cjd3_OhzCjGooPUxdc7Es"
    e.preventDefault();
    try{
        const response=await axios.post(url,{
            idToken:atx.token,
            displayName:name,
            photoUrl:image,
            deleteAttribute:null,
            returnSecureToken:true	
        
        })
        
        const data=response.data;     
    alert("Profile updated successfully")
    }catch(error){
        console.log(error)
    }

    console.log(name, image);
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