import LoginPage from './pages/Login'
import Header from './Layout/Header';
import { AuthorizationProvider } from './Store/AuthContext';
import { Route } from 'react-router-dom';
import Profile from './pages/Profile';
import AuthContext from './Store/AuthContext';
import { useContext } from 'react';
import Home from './pages/Home';
import Dashboard from './Layout/DashBoard';
import PasswordResetForm from './Layout/PasswordResetForm';

function App() {
  const atx=useContext(AuthContext)

  return (
   <>
   <AuthorizationProvider>
       <Header/>
      
      {!atx.isLoggedIn &&<Route path='/login'> <LoginPage/></Route>  }
      <Route  path='/home'><Home></Home></Route>
       <Route path='/profile'><Profile/></Route>
       <Route path='/dashboard'><Dashboard/></Route>
       <Route path='/passwordreset'><PasswordResetForm/></Route>

                  

   </AuthorizationProvider>
  
   </>
  );
}

export default App;
