import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import '../css/App.css'
import { handleInitialData } from '../actions/shared'
import AppNav from './AppNav'
import Login from './Login'
import Home from './Home'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Fragment>
        <AppNav />
        <main role="main" className="container">
          <div className="page">
            {this.props.isAuthenticated ?
              <Home />
              :
              <Login />
            }
          </div>
        </main>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  return {
    isAuthenticated: !(authedUser === null)
  }
}

export default connect(mapStateToProps)(App);
