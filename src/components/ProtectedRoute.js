import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

function mapStateToProps({ authedUser }) {
  return {
    isAuthenticated: authedUser !== null
  }
}

export default connect(mapStateToProps)(ProtectedRoute)