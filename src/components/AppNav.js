import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


class AppNav extends Component {
  render () {
    return (
      <Fragment>
      {
        this.props.isAuthenticated ?
          <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
            <Navbar.Toggle aria-controls="main-navbar-nav" />
            <Navbar.Collapse id="main-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/new">New Question</Nav.Link>
              <Nav.Link href="/leaderboard">Leader Board</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            <span>
              <span className="text-light pr-3 pl-3">Hello, {this.props.name}</span>
              <img src={this.props.avatarURL} alt={this.props.name} className="img-avatar-small" />
            </span>
            <Nav className="no-wrap ml-auto">
              <Nav.Link href="/logout">Log Out</Nav.Link>
            </Nav>
          </Navbar>
        :
          null
      }
      </Fragment>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  let isAuthenticated = !(authedUser === null)

  return {
    name: isAuthenticated ? users[authedUser].name : '',
    avatarURL: isAuthenticated ? users[authedUser].avatarURL : '',
    isAuthenticated: isAuthenticated
  }
}

export default connect(mapStateToProps)(AppNav);
