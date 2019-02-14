import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink as BootstrapNavLink } from 'reactstrap'
//import { IndexLinkContainer } from 'react-router-bootstrap'
import { NavLink, withRouter} from 'react-router-dom'


class AppNav extends Component {
  state = {
    isOpen: false
  }

  toggle = (e) => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = (e) => {
    e.preventDefault();
  }

  render () {
    return (
      <Fragment>
      {
        !this.props.isAuthenticated
          ? null
            : <Navbar color='dark' dark expand='sm'>
              <NavbarToggler onClick={(e) => this.toggle(e)} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className='mr-auto' navbar>
                  <NavItem >
                    <NavLink exact className='nav-link' to='/' activeClassName='active'>Home</NavLink>
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
                  <BootstrapNavLink href='/logout' onClick={(e) => this.logout(e)}>Log Out</BootstrapNavLink>
                </NavItem>
              </Nav>
            </Navbar>

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

export default withRouter(connect(mapStateToProps)(AppNav));
