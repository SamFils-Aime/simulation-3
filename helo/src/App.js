import React from 'react';
import './App.scss';
import Routes from './Routes';
import { withRouter } from 'react-router-dom';
import Nav from './Components/Nav';

function App(props) {
  const Path = props.location.pathname !== '/'
  return (
    <div className={Path ? "account" : '' }>
      { Path ? <Nav /> : null }
      { Routes }
    </div>
  );
}


export default withRouter(App);
