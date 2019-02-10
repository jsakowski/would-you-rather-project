import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Welcome to the Would You Rather App</h1>
          <h6 className="card-subtitle mb-5 text-muted">Please log in to continue</h6>
          <form className="form-signin">
            <div className="form-group">
              <label className="sr-only">Select a user</label>
              <select className="form-control" id="auth">
                <option>Please select an user</option>
                <option>Sarah Edo</option>
                <option>Tyler McGinnis</option>
                <option>John Doe</option>
              </select>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login