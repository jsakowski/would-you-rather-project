import React, { Component, Fragment } from 'react';
import '../css/bootstrap.min.css';
import '../css/App.css'
import Nav from './Nav'
import Login from './Login'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <main role="main" className="container">
          <div className="page">
            <Login />
          </div>
        </main>
      </Fragment>
    );
  }
}

export default App;
