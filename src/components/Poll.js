import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import PollWrapper from './PollWrapper'
import AnswerDetails from './AnswerDetails'

class Poll extends Component {

  render() {
    const { author, avatarURL, option1, option2, authedUserVote } = this.props

    const totalVotes = option1.votes + option2.votes
    const per1 = Math.floor(option1.votes / totalVotes * 100)
    const per2 = Math.floor(option2.votes / totalVotes * 100)


    return (
      <PollWrapper headerText={`Asked by ${author}`} authorAvatar={avatarURL}>
        <Card.Title as="h1">Result</Card.Title>
        <AnswerDetails
          text={option1.text}
          votes={option1.votes}
          totalVotes={totalVotes}
          isVotedByAuthedUser={authedUserVote === 1}
          isWinner={option1.votes >= option2.votes} />
        <AnswerDetails
          text={option2.text}
          votes={option2.votes}
          totalVotes={totalVotes}
          isVotedByAuthedUser={authedUserVote === 2}
          isWinner={option2.votes >= option1.votes} />
      </PollWrapper>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const poll = questions[id]
  const author = users[poll.author]
  const authedUserVote = poll.optionOne.votes.includes(authedUser) ?
    1
    :
    poll.optionTwo.votes.includes(authedUser) ? 2 : 0

  return {
    author: author.name,
    avatarURL: author.avatarURL,
    option1: {
      text: poll.optionOne.text,
      votes: poll.optionOne.votes.length,
    },
    option2: {
      text: poll.optionTwo.text,
      votes: poll.optionTwo.votes.length,
    },
    authedUserVote: authedUserVote,
  }
}

export default connect(mapStateToProps)(Poll)