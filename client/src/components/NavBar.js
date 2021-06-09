import React, { useContext } from 'react';
import { Navbar, Button, Col, Form, FormControl } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { AdminContext } from '../AdminContext';
import { iconEdit } from '../icons';
import { Link } from 'react-router-dom';


const NavBar = (props) => {
    const context = useContext(AdminContext);
    return (
        <Navbar bg="primary" expand="sm" fixed="top" variant="dark" >
            <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#left-sidebar" aria-controls="left-sidebar" aria-expanded="false" aria-label="Toggle sidebar">
                <span className="navbar-toggler-icon"></span>
            </Button>
            <Navbar.Brand href="#home" >
                {iconEdit}
                &nbsp;
                Survey
            </Navbar.Brand>
            
            <Col className="mr-sm-2 d-none d-sm-block text-center">
                <Form inline className="my-2 my-lg-0 mx-auto d-none d-sm-block">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form>
            </Col>

            <Nav className="ml-md-auto">
                {context?.loggedIn &&
                <>
                    <Nav.Link>{context.message}</Nav.Link>    
                    <Nav.Link onClick = {() => {props.logout()}}>Logout</Nav.Link>    
                </>
                }
                <Nav.Link href="#">
                    {/* <Link to='/login'> */}
                        Login &nbsp; &nbsp;
                    {/* </Link> */}
                    <svg className="bi bi-people-circle" width="30" height="30" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z" />
                        <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clipRule="evenodd" />
                    </svg>
                    </Nav.Link>
            </Nav>
        </Navbar >
    );
}
export default NavBar;