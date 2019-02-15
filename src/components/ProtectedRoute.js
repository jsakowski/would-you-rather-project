import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class ProtectedRoute extends Component {
  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props
    return (
      <Route {...rest} render={(props) => (
        isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
      )} />
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    isAuthenticated: authedUser !== null
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
