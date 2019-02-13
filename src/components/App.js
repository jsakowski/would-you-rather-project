import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import AppNav from './AppNav'
import Login from './Login'
import Home from './Home'
import PollContainer from './PollContainer'
import NewPoll from './NewPoll'
import LoadingBar from 'react-redux-loading-bar'
import '../css/App.css'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
    console.log('App - componentDidMount', this.props.loading, this.props.isAuthenticated)
  }

  render() {
    console.log('App - render', this.props.loading, this.props.isAuthenticated)
    return (
      <Router>
        <Fragment>
          <header>
            <div className='fixed-top'><LoadingBar showFastActions /></div>
            <AppNav />
          </header>
          {!this.props.isAuthenticated || this.props.loading
          ? null
          : <main role='main' className='container'>
              <div className='page'>
                <Route path='/' exact component={Home} />
                <Route path='/question/:id' component={PollContainer} />
                <Route path='/new' component={NewPoll} />
	            </div>
            </main>
          }
        </Fragment>
      </Router>
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
