import React from 'react'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import ProgressBar from 'react-bootstrap/ProgressBar'

const AnswerDetails = (props) => {
  const {text, votes, totalVotes, isVotedByAuthedUser, isWinner} = props

  const percentage = Math.floor(votes / totalVotes * 100)
  const variant = isWinner ? 'success' : 'secondary'
  const barDescription = votes === 0 ?
    'No votes yet'
    :
    `${votes} out of ${totalVotes} votes`

  return (
    <Alert variant={variant} className="poll-secondary">
      {
        isVotedByAuthedUser ?
          <div className="text-right"><Badge className="p-2 rounded-circle" variant="warning">Your<br />Vote</Badge></div>
        :
        null
      }
      <p>Would you rather {text}?</p>
      <ProgressBar now={percentage} label={percentage === 0 ? '' : `${percentage}%`} />
      <p className="text-center"><small>{barDescription}</small></p>
    </Alert>
  )
}

export default AnswerDetails
