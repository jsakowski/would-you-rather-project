import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PollWrapper from './PollWrapper'
import { handleSaveQuestionAnswer } from '../actions/questions'

class PollVoter extends Component {
  state ={
    answer: null
  }

  handleChange = (e) => {
    const answer = e.target.id

    this.setState(() => ({
      answer,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { answer } = this.state
    const { dispatch, id } = this.props
    
    dispatch(handleSaveQuestionAnswer(id, answer))
  }

  render () {
    const { author, authorAvatar, optionOne, optionTwo } = this.props

    return (
      <PollWrapper author={author} authorAvatar={authorAvatar}>
        <Card.Title as="h1">Would you rather...</Card.Title>
        <Form id="poll" onSubmit={this.handleSubmit}>
          <Form.Check
            type="radio"
            label={optionOne}
            name="answerGroup"
            id="optionOne"
            onChange={this.handleChange}
            required
          />
          <Form.Check
            className="mt-3"
            type="radio"
            label={optionTwo}
            name="answerGroup"
            id="optionTwo"
            onChange={this.handleChange}
            required
          />
          <Button className="mt-4" variant="primary btn-block" type="submit">Submit</Button>
        </Form>
      </PollWrapper>
    )
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const poll = questions[id]
  const author = users[poll.author]
  //const isAnswered = poll.optionOne.votes.includes(authedUser) || poll.optionTwo.votes.includes(authedUser)

  return {
      author: author.name,
      authorAvatar: author.avatarURL,
      optionOne: poll.optionOne.text,
      optionTwo: poll.optionTwo.text,
  }
}

export default connect(mapStateToProps)(PollVoter)