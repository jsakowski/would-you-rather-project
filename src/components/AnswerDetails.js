import React from 'react'
import { Alert, Badge, Progress } from 'reactstrap';

const AnswerDetails = (props) => {
  const {text, votes, totalVotes, isVotedByAuthedUser, isWinner} = props

  const percentage = Math.floor(votes / totalVotes * 100)
  const variant = isWinner ? 'success' : 'secondary'
  const barDescription = votes === 0 ?
    'No votes yet'
    :
    `${votes} out of ${totalVotes} votes`

  return (
    <Alert color={variant} className='poll-secondary'>
      {
        isVotedByAuthedUser ?
          <div className='text-right'><Badge className='p-2 rounded-circle' color='warning'>Your<br />Vote</Badge></div>
        :
        null
      }
      <p>Would you rather {text}?</p>
      <div className='text-center'>{percentage === 0 ? '' : `${percentage}%`}</div>
      <Progress value={percentage} />
      <p className='text-center'><small>{barDescription}</small></p>
    </Alert>
  )
}

export default AnswerDetails
