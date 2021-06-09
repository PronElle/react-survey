import React from 'react';
import { withRouter } from 'react-router-dom';

// components
import NavBar from './components/NavBar';

function App() {
  return (
    <>
     <NavBar/>
    </>
  );
}

export default withRouter(App);
