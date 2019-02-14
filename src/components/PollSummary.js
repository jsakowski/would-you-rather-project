import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { CardTitle, CardText, Button } from 'reactstrap';
import PollWrapper from './PollWrapper'
import { getPollAuthor } from '../utils/pollHelper'


class PollSummary extends Component {
  hadleViewPoll = (e) => {
    e.preventDefault()
    this.props.history.push(`/question/${this.props.id}`)
  }

  render() {
    const {name, avatarURL, text} = this.props
    return (
      <PollWrapper headerText={`${name} asked:`} authorAvatar={avatarURL}>
        <CardTitle tag='h5'>Would you rather</CardTitle>
        <CardText>{text}...</CardText>
        <Button color='primary' className='btn-block' onClick={this.hadleViewPoll}>View Poll</Button>
      </PollWrapper>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const poll = questions[id]
  const author = users[poll.author]

  return {
    ...getPollAuthor(author),
    text: poll.optionOne.text,
  }
}

export default withRouter(connect(mapStateToProps)(PollSummary))