import React,{useState} from "react";


const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

  
export const AuthorizationProvider=(props)=>{

        const initial_state=localStorage.getItem('token');
        const [isToken,setToken]=useState(initial_state);

        const userIsLoggedin=!!isToken;
        const loginHandler=(token)=>{
            setToken(token)
            localStorage.setItem('token',token)
        }
      const logoutHandler=()=>{
          setToken(null);
          localStorage.removeItem('token')
      }

    const authContext={
        token:isToken,
        isLoggedIn:userIsLoggedin,
        login:loginHandler,
        logout:logoutHandler
      }
    
    


    return(
        <AuthContext.Provider  value={authContext}>
                {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext;