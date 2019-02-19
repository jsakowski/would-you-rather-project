import React from 'react'
import { Alert, Progress } from 'reactstrap';
import { FaCheckCircle } from 'react-icons/fa'
import { IconContext } from 'react-icons'

const AnswerDetails = (props) => {
  const {text, votes, totalVotes, isVotedByAuthedUser, isWinner} = props

  const percentage = Math.floor(votes / totalVotes * 100)
  const variant = isWinner ? 'info' : 'danger'

  const barDescription = votes === 0 ? '' : `${votes} voted`

  return (
    <Alert color={variant}>
      {
        isVotedByAuthedUser &&
        <IconContext.Provider value={{ className: 'user-vote' }}>
          <div>
            <FaCheckCircle />
          </div>
        </IconContext.Provider>
      }
      <p>Would you rather {text}?</p>
      <h3 className='text-center'>{`${percentage}%`}</h3>
      <Progress value={percentage} />
      <p className='text-center'><small>{barDescription}</small></p>
    </Alert>
  )
}

export default AnswerDetails
