import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import AuthContext from '../Store/AuthContext';
import { NavLink } from 'react-router-dom';
import Home from '../pages/Home';
import { useHistory } from 'react-router-dom';


const Header = () => {
  const history=useHistory();

    const atx=useContext(AuthContext);

    const logoutHandler=()=>{
        atx.logout();
        history.replaceState('/login')
    }

  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand >Expense Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link to='/home' as={NavLink}>Home</Nav.Link>
          <Nav.Link  to="/profile" as={NavLink}>  Profile</Nav.Link>
        {!atx.isLoggedIn &&  <Nav.Link to="/login" as={NavLink}  >Login</Nav.Link>}
        {atx.isLoggedIn&&  <Button variant="outline-none" className='float-right' onClick={logoutHandler}>Logout</Button>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
