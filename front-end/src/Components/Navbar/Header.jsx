import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Header.scss"

const Header = () => {
  return (
    <Navbar>
      <Navbar.Brand href='/transactions'>BudgetYaSelf</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href='/transactions'>Home</Nav.Link>
        <Nav.Link href='/transactions/new'>New</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;