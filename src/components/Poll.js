import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CardTitle } from 'reactstrap'
import PollWrapper from './PollWrapper'
import AnswerDetails from './AnswerDetails'


class Poll extends Component {
  static propTypes = {
    author: PropTypes.object.isRequired,
    poll: PropTypes.object.isRequired,
    memberVote: PropTypes.number.isRequired,
  }

  render() {
    const { author, poll, memberVote } = this.props

    const totalVotes = poll.option1.votes + poll.option2.votes

    return (
      <PollWrapper headerText={`Asked by ${author.name}`} authorAvatar={author.avatarURL}>
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
      </PollWrapper>
    )
  }
}

export default Poll