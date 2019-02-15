import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getMemberVote, formatPoll4Vote, formatPoll, getUser } from '../utils/pollHelper'
import { handleSaveQuestionAnswer } from '../actions/questions'
import PollVoter from './PollVoter'
import Poll from './Poll'
import NotFound from './NotFound'

class PollContainer extends Component {
  handleSaveAnswer = (id, answer) => {
    const { dispatch } = this.props
    dispatch(handleSaveQuestionAnswer(id, answer))
  }

  render() {
    const { memberVote, author, poll } = this.props

    return (
      <Fragment>
        {poll === null && <NotFound />}
        {poll !== null && (
          memberVote === 0
          ? <PollVoter author={author} poll={poll} handleSaveAnswer={this.handleSaveAnswer} />
          : <Poll author={author} poll={poll} memberVote={memberVote} />
        )}
      </Fragment>
    )
  }
}
function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params

  const poll = questions[id]

  if (poll === undefined) {
    return {
      poll: null,
    }
  }

  const author = users[poll.author]
  const memberVote = getMemberVote(poll, authedUser)

  const formattedPoll = (memberVote === 0)
    ? formatPoll4Vote(poll)
    : formatPoll(poll)

  return {
    author: getUser(users[poll.author]),
    poll: formattedPoll,
    memberVote: memberVote,
  }
}

export default connect(mapStateToProps)(PollContainer)