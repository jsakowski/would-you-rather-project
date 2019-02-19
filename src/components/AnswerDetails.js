import React from 'react'
import { Alert, Badge, Progress } from 'reactstrap';

const AnswerDetails = (props) => {
  const {text, votes, totalVotes, isVotedByAuthedUser, isWinner} = props

  const percentage = Math.floor(votes / totalVotes * 100)
  const variant = isWinner ? 'info' : 'danger'

  const barDescription = votes === 0 ? '' : `${votes} voted`

  return (
    <Alert color={variant}>
      {
        isVotedByAuthedUser &&
          <div className='float-right'><Badge className='p-2 rounded-circle' color='warning'>Your<br />Vote</Badge></div>
      }
      <p>Would you rather {text}?</p>
      <h3 className='text-center'>{`${percentage}%`}</h3>
      <Progress value={percentage} />
      <p className='text-center'><small>{barDescription}</small></p>
    </Alert>
  )
}

export default AnswerDetails
