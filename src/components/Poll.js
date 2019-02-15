import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMemberVote, formatPoll4Vote, formatPoll, getUser } from '../utils/pollHelper'
import { handleSaveQuestionAnswer } from '../actions/questions'
import AnsweredPoll from './AnsweredPoll'
import UnnsweredPoll from './UnansweredPoll'
import NotFound from './NotFound'
import PollWrapper from './PollWrapper'


class PollContainer extends Component {
  handleSaveAnswer = (id, answer) => {
    const { dispatch } = this.props
    dispatch(handleSaveQuestionAnswer(id, answer))
  }

  render() {
    const { memberVote, poll, author } = this.props
    if (poll === null)
      return (<NotFound />)

    return (
      <PollWrapper headerText={`Asked by ${author.name}`} authorAvatar={author.avatarURL} isCancelButton={true}>
      {
         memberVote === 0
            ? <UnnsweredPoll handleSaveAnswer={this.handleSaveAnswer} {...this.props} />
            : <AnsweredPoll {...this.props} />
      }
      </PollWrapper>
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