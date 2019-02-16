import React from 'react'
import PropTypes from 'prop-types'
import { CardTitle, CardBody } from 'reactstrap'
import AnswerDetails from './AnswerDetails'


const AnsweredPoll = (props) => {
  const { poll, vote } = props

  const optionOneVotes = poll.optionOne.votes.length
  const optionTwoVotes = poll.optionTwo.votes.length
  const totalVotes = poll.optionOne.votes.length + poll.optionTwo.votes.length

  return (
    <CardBody>
      <CardTitle tag='h1'>Result</CardTitle>
      <AnswerDetails
        text={poll.optionOne.text}
        votes={optionOneVotes}
        totalVotes={totalVotes}
        isVotedByAuthedUser={vote === 1}
        isWinner={optionOneVotes >= optionTwoVotes} />
      <AnswerDetails
        text={poll.optionTwo.text}
        votes={optionTwoVotes}
        totalVotes={totalVotes}
        isVotedByAuthedUser={vote === 2}
        isWinner={optionTwoVotes >= optionOneVotes} />
    </CardBody>
  )
}

AnsweredPoll.propTypes = {
  poll: PropTypes.object.isRequired,
  vote: PropTypes.number.isRequired,
}

export default AnsweredPoll