import React, { useContext, useState,useEffect} from "react";
import AuthContext from "../Store/AuthContext";
import { Button, Modal } from "react-bootstrap";
import ProfileForm from "../Layout/ProfileForm";
import { auth,storage,database } from '../firebase/firebase'
import { getDownloadURL,ref } from "firebase/storage";




 // Download the user's profile image from Firebase Storage

 const downloadImage = (imageUrl) => {     
    const imageRef = storage.refFromURL(imageUrl);
    imageRef.getDownloadURL().then((url) => {
        return url;
    }).catch((error) => {
      console.log(error);
    });
  }


const Profile=(props)=>{
    const atx=useContext(AuthContext)
    const [isProfile,setProfile]=useState(false);
    const [user,setUser]=useState(atx.userDetails)
    const [image,setImage]=useState("")
    const [name,setName]=useState("")
    console.log("user",user)
   
    
    // useEffect(()=>{
    //     if (atx.userDetails.imageURL) {
    //        const URL= downloadImage(atx.userDetails.imageURL);
    //        setImage(URL)
    //       }
    //     }, [atx.userDetails.imageURL]);
      

    const profileClickHandler=()=>{
        setProfile(true)
    }
    return(
        <div>
            <header>
                <h3>Welcome to Expense Tracker</h3>
                 <h6>your profile is incomplete </h6>  <span className='float-right'>
                <Button className='bg-white-sm me-2' onClick={profileClickHandler}>
                    Complete Now
                </Button></span>
            </header>
        {name &&<h2>{name}</h2>}
        {image && <img height="300px" width="300px" src="image"></img>}
       
        {isProfile &&(<ProfileForm/>)}
         
          
        </div>
    )

}

export default Profile;