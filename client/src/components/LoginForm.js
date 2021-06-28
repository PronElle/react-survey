import React, { useState, useContext } from 'react';
import { Form, Button, Alert, Card, Row, Col, InputGroup } from 'react-bootstrap';
import { AdminContext } from '../context/AdminContext';
import { iconLock, iconPerson } from '../icons';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const context = useContext(AdminContext);

  const handleSubmit = (event) => {
      event.preventDefault();
      context.setMessage('');
      
      if(username.trim() === '' || password.trim() === '' || password.length < 6)
        context.setMessage('Invalid Username or Password')
      else{
        const credentials = { username, password };
        props.login(credentials);
      }    
  }

  return (
    <>
      <Row  className="below-nav-center" >
        <Card border="secondary" className="mx-auto"  style={{width: '500px', height:'600px'}}>
          <Card.Header className="bg-primary">
            <h2 className="ui teal image header mx-auto">
              <svg className="bi bi-pencil-square" width="40" height="40" viewBox="0 0 16 16" fill="orange" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"/>
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clipRule="evenodd"/>
              </svg>
              
              <div className="content">
                  Log-in to Survey App
              </div>
            </h2>
          </Card.Header>

          <Card.Body>
            <svg className="bi bi-person-circle" width="450" height="150" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z" />
              <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clipRule="evenodd" />
            </svg>
            
            <Form>
              <Form.Group className='login-form' controlId='username'>
                  <InputGroup hasValidation>
                    <InputGroup.Prepend >
                      <InputGroup.Text>{iconPerson}</InputGroup.Text>
                    </InputGroup.Prepend>

                    <Form.Control size="lg" type='email' value={username} placeholder="email" onChange={ev => setUsername(ev.target.value)} isInvalid={context.message !== ''}/>
                  </InputGroup>
              </Form.Group>
              
              <Form.Group className='login-form' controlId='password'>
                <InputGroup hasValidation>
                  <InputGroup.Prepend>
                   <InputGroup.Text>{iconLock}</InputGroup.Text>
                  </InputGroup.Prepend>
                  
                  <Form.Control size="lg" type='password' value={password} placeholder="password" onChange={ev => setPassword(ev.target.value)} isInvalid={context.message !== ''}/>
                </InputGroup>  
              </Form.Group> 
            </Form>

            <Row>
              <Col> <Button size="lg" variant="primary" type="submit" onClick={handleSubmit}>Login</Button></Col>
              <Col sm={9}>{context.message && <Alert  variant='danger' onClose={() => context.setMessage('')} dismissible>{context.message}</Alert> }</Col>
            </Row>
            
          </Card.Body>
        </Card>
      </Row>        
    </> );
}



export default LoginForm ;