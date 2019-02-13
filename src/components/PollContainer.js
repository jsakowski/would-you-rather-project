import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getMemberVote, formatPoll4Vote, formatPoll, getPollAuthor } from '../utils/pollHelper'
import { handleSaveQuestionAnswer } from '../actions/questions'
import PollVoter from './PollVoter'
import Poll from './Poll'

class PollContainer extends Component {
  handleSaveAnswer = (answer) => {
    const { dispatch, id } = this.props
    dispatch(handleSaveQuestionAnswer(id, answer))
  }

  render() {
    const { memberVote, author, poll } = this.props
    return (
      <Fragment>
        {memberVote === 0
          ? <PollVoter author={author} poll={poll} handleSaveAnswer={this.handleSaveAnswer} />
          : <Poll author={author} poll={poll} memberVote={memberVote} />
        }
      </Fragment>
    )
  }
}
function mapStateToProps({ authedUser, users, questions }, { id }) {
  const poll = questions[id]
  const author = users[poll.author]
  const memberVote = getMemberVote(poll, authedUser)

  const formattedPoll = (memberVote === 0)
    ? formatPoll4Vote(poll)
    : formatPoll(poll)


  return {
    author: getPollAuthor(author),
    poll: formattedPoll,
    memberVote: memberVote,
  }

}

export default connect(mapStateToProps)(PollContainer)