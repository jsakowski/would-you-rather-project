import React from 'react'
import PropTypes from 'prop-types'
import { CardTitle, CardBody } from 'reactstrap'
import AnswerDetails from './AnswerDetails'


const AnsweredPoll = (props) => {
  const { poll, memberVote } = props
  const totalVotes = poll.option1.votes + poll.option2.votes
  return (
    <CardBody>
      <CardTitle tag='h1'>Result</CardTitle>
      <AnswerDetails
        text={poll.option1.text}
        votes={poll.option1.votes}
        totalVotes={totalVotes}
        isVotedByAuthedUser={memberVote === 1}
        isWinner={poll.option1.votes >= poll.option2.votes} />
      <AnswerDetails
        text={poll.option2.text}
        votes={poll.option2.votes}
        totalVotes={totalVotes}
        isVotedByAuthedUser={memberVote === 2}
        isWinner={poll.option2.votes >= poll.option1.votes} />
    </CardBody>
  )
}

AnsweredPoll.propTypes = {
  poll: PropTypes.object.isRequired,
  memberVote: PropTypes.number.isRequired,
}

export default AnsweredPoll