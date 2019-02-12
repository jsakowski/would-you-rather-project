import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollWrapper from './PollWrapper'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class PollSummary extends Component {
  hadleViewPoll = () => {

  }

  render() {
    const {author, avatarURL, text} = this.props
    return (
      <PollWrapper headerText={`${author} asked:`} authorAvatar={avatarURL}>
        <Card.Title>Would you rather</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button variant="primary btn-block" onClick={this.hadleViewPoll}>View Poll</Button>
      </PollWrapper>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const poll = questions[id]
  const author = users[poll.author]

  return {
    author: author.name,
    avatarURL: author.avatarURL,
    text: poll.optionOne.text,
  }
}

export default connect(mapStateToProps)(PollSummary)