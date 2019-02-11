import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class Nav extends Component {
  render () {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>

        {this.props.isAuthenticated === true ?
          <Fragment>
            <div className="collapse navbar-collapse" id="navbarsDefault">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#navbarsDefault">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#navbarsDefault">New Question</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#navbarsDefault">Leader Board</a>
                </li>
              </ul>
            </div>
            <span className="text-light pr-3">Hello, {this.props.name}</span>
            <img src={this.props.avatarURL} alt={this.props.name} className="img-avatar" />
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#navbarsDefault">Log Out</a>
              </li>
            </ul>
          </Fragment>
          :
          <p>&nbsp;</p>
        }
      </nav>
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

export default connect(mapStateToProps)(Nav);
