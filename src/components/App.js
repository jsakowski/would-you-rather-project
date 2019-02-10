import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import '../css/bootstrap.min.css';
import '../css/App.css'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Login from './Login'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

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

export default connect()(App);
