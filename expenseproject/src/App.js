import logo from './logo.svg';
import './App.css';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login'
import Header from './Layout/Header';
import { AuthorizationProvider } from './Store/AuthContext';


function App() {

  return (
   <>
   <AuthorizationProvider>
       <Header/>
       <LoginPage/>

   </AuthorizationProvider>
  
   </>
  );
}

export default App;
