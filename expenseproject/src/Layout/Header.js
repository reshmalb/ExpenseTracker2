import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="/">Expense Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Button variant="outline-secondary" href="/logout">Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
