import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import '../css/App.css'
import { handleInitialData } from '../actions/shared'
import AppNav from './AppNav'
import Login from './Login'
import Home from './Home'
import LoadingBar from 'react-redux-loading-bar'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Fragment>
        <header>
          <LoadingBar showFastActions />
          <AppNav />
        </header>
        {this.props.loading === true
        ? null
        : <main role="main" className="container">
            <div className="page">
              {this.props.isAuthenticated ?
                <Home />
                :
                <Login />
              }
            </div>
          </main>
        }
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, loadingBar }) {
  return {
    loading: loadingBar.default === 1,
    isAuthenticated: !(authedUser === null)
  }
}

export default connect(mapStateToProps)(App);
