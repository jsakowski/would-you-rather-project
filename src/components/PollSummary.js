import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import PollWrapper from './PollWrapper'
import { getPollAuthor } from '../utils/pollHelper'


class PollSummary extends Component {
  hadleViewPoll = (e) => {
    e.preventDefault()
    this.props.history.push(`/question/${this.props.id}`)
  }

  render() {
    const {name, avatarURL, text} = this.props
    console.log('PollSummary - render', name, avatarURL, text)
    return (
      <PollWrapper headerText={`${name} asked:`} authorAvatar={avatarURL}>
        <Card.Title>Would you rather</Card.Title>
        <Card.Text>{text}...</Card.Text>
          <Button variant='primary btn-block' onClick={this.hadleViewPoll}>View Poll</Button>
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