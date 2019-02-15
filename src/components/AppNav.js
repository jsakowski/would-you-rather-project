import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink as BootstrapNavLink } from 'reactstrap'
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import { getUser } from '../utils/pollHelper'
import { logout } from '../actions/authedUser'

class AppNav extends Component {
  state = {
    isOpen: false,
    redirect: false,
  }

  toggle = (e) => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleLogout = (e) => {
    const { dispatch } = this.props

    e.preventDefault();
    dispatch(logout())
    this.setState({
      redirect: true
    });
  }

  render () {
    const { redirect } = this.state

    if (redirect === true) {
      return <Redirect to='/' />
    }

    return (
      <Navbar color='dark' dark expand='sm'>
        <NavbarToggler onClick={(e) => this.toggle(e)} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem >
              <NavLink
                exact
                className='nav-link'
                to='/' activeClassName='active'
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem >
              <NavLink className='nav-link' to='/new' activeClassName='active'>New Question</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='nav-link' to='/leaderboard'>Leader Board</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <span>
          <span className='text-light pr-3 pl-3'>Hello, {this.props.name}</span>
          <img src={this.props.avatarURL} alt={this.props.name} className='img-avatar-small' />
        </span>
        <Nav className='no-wrap ml-auto' navbar>
          <NavItem>
            <BootstrapNavLink href='/logout' onClick={this.handleLogout}>Log Out</BootstrapNavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    ...getUser(users[authedUser])
  }
}

export default withRouter(connect(mapStateToProps)(AppNav));
