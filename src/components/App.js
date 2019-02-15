import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/App.css'
import { handleInitialData } from '../actions/shared'
import AppNav from './AppNav'
import Login from './Login'
import Home from './Home'
import PollContainer from './PollContainer'
import NewPoll from './NewPoll'
import LoadingBar from 'react-redux-loading-bar'
import LeaderBoard from './LeaderBoard';
import NotFound from './NotFound'
import ProtectedRoute from './ProtectedRoute'


class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
    console.log('App - componentDidMount', this.props.loading, this.props.isAuthenticated)
  }

  render() {
    const { loading, isAuthenticated } = this.props

    return (
      <Router>
        <Fragment>
          <header>
            <div className='fixed-top'><LoadingBar showFastActions /></div>
            {
              isAuthenticated &&
              <AppNav />
            }
          </header>
             <main role='main' className='container'>
                <div className='page'>
                {
                  (!loading) &&
                    <Switch>
                      <Route path='/login' component={Login} />
                      <ProtectedRoute path='/' exact component={Home} />
                      <ProtectedRoute path='/question/:id' component={PollContainer} />
                      <ProtectedRoute path='/new' component={NewPoll} />
                      <ProtectedRoute path='/leaderboard' component={LeaderBoard} />
                      <Route component={NotFound} />
                    </Switch>
                }
                </div>
              </main>
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
