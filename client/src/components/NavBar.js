import React, { useContext } from 'react';
import { Navbar, Button, Col, Form, FormControl } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { AdminContext } from '../AdminContext';
import { iconEdit, iconPersonCircle } from '../icons';
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
                    <Link to='/login'  style={{ paddingRight: 20 ,color: 'white' }}>
                        Login
                    </Link>
                    {iconPersonCircle}
                    </Nav.Link>
            </Nav>
        </Navbar >
    );
}
export default NavBar;