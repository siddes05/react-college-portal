import React, { Fragment } from 'react';
import {Container, Nav,Navbar} from 'react-bootstrap';
import Home from './Home';
import Student from './Student';
import Department from './Department';
import { Outlet } from 'react-router-dom';

const Navbarheader = () => {
  return (
   
    <Fragment>
    <Navbar collapseOnSelect expand="lg" bg="info" >  
    <Container>  
      <Navbar.Brand href="home">College portal</Navbar.Brand>  
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />  
      <Navbar.Collapse id="responsive-navbar-nav">  
        <Nav className="me-auto">  
          <Nav.Link href="home">Home</Nav.Link>  
          <Nav.Link href="department">Department</Nav.Link>  
          <Nav.Link href="student">Student</Nav.Link>   
        </Nav>  
      </Navbar.Collapse>  
    </Container>  
    </Navbar>
    <Outlet></Outlet>
    </Fragment>

  )
}

export default Navbarheader