import React from 'react'

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <button className="navbar-toggler" type="button">
        <span className="navbar-toggler-icon"></span>
      </button>

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
      <span className="text-light pr-3">Hello, Sara Edo</span>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="#navbarsDefault">Log Out</a>
        </li>
      </ul>
    </nav>
  )
}