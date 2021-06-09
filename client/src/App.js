import React from 'react';
import { Container } from 'react-bootstrap';
import { withRouter, Switch, Route } from 'react-router-dom';
import { AdminContext } from './AdminContext';

// components
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <AdminContext.Provider>
      <Container fluid>
        <NavBar/>
        <Switch>

          <Route path='/login'>
            <LoginForm/>
          </Route>

          
        </Switch>
      </Container>
    </AdminContext.Provider>
  );
}

export default withRouter(App);
