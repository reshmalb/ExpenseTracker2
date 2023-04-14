import React, { useContext, useState,useEffect} from "react";
import AuthContext from "../Store/AuthContext";
import { Button, Modal } from "react-bootstrap";
import ProfileForm from "../Layout/ProfileForm";
import { auth,storage,database } from '../firebase/firebase'
import { getDownloadURL,ref } from "firebase/storage";
import { sendEmailVerification } from "firebase/auth";




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
   
    const [isSent, setIsSent] = useState(false);

    const handleVerifyEmail = async () => {
      try {
        const user = auth.currentUser;
        if (!user.emailVerified) {
          // Generate a unique verification code or token
          const verificationCode = Math.floor(100000 + Math.random() * 900000);
          
          // Send the verification email using Firebase's Email API
        sendEmailVerification(auth,{
            url: `${process.env.REACT_APP_VERIFY_EMAIL_URL}?code=${verificationCode}`,
          });
  
          setIsSent(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
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
                <div>
      {isSent ? (
        <p>A verification email has been sent to your email address.</p>
      ) : (
        <button onClick={handleVerifyEmail}>Verify Email ID</button>
      )}
    </div>
            </header>
        {name &&<h2>{name}</h2>}
        {image && <img height="300px" width="300px" src="image"></img>}
       
        {isProfile &&(<ProfileForm/>)}
         
          
        </div>
    )

}

export default Profile;