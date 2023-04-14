import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage} from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBmu2iAn2bEUPLR2hBHCQAhknCpMMWjz3o",
    authDomain: "fir-login-aea12.firebaseapp.com",
    projectId: "fir-login-aea12",
    storageBucket: "fir-login-aea12.appspot.com",
    messagingSenderId: "394751119213",
    appId: "1:394751119213:web:60bb6ffdf84365efe11464",
    measurementId: "G-JWSVR4CMZB"
  };
  const app = initializeApp(firebaseConfig);
  const auth=getAuth();
  const database = getDatabase(app);
  const storage=getStorage(app)
export {app,auth,storage,database}