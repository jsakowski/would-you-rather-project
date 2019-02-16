import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink as BootstrapNavLink } from 'reactstrap'
import { NavLink, withRouter } from 'react-router-dom'
import { logout } from '../actions/authedUser'
import { getAuthedUser } from '../reducers'

class AppNav extends Component {
  state = {
    isOpen: false,
  }

  toggle = (e) => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleLogout = (e) => {
    const { dispatch, history } = this.props

    e.preventDefault();
    dispatch(logout())

    history.push('/')
  }

  render () {
  
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

function mapStateToProps(state) {
  return {
    ...getAuthedUser(state)
  }
}

export default withRouter(connect(mapStateToProps)(AppNav));
