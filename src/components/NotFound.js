import React from 'react'
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom'

const PollNotFound = (props) => {
  return (
    <div>
      <Alert color="danger">
        <h4 className="alert-heading">Ooops!</h4>
        <hr />
        <p>We can't seem to find the page you're looking for.</p>
      </Alert>
      <ul>
        Here are some helpful links:
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/new'>New Question</Link></li>
        <li><Link to='/leaderboard'>Leader Board</Link></li>
      </ul>
    </div>
  )
}

export default PollNotFound
