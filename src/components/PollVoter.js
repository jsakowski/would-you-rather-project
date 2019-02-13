import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PollWrapper from './PollWrapper'
import PropTypes from 'prop-types'


class PollVoter extends Component {
  static propTypes = {
    author: PropTypes.object.isRequired,
    poll: PropTypes.object.isRequired,
    handleSaveAnswer: PropTypes.func.isRequired,
  }

  state = {
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
    const { handleSaveAnswer } = this.props

    handleSaveAnswer(answer)
  }

  render () {
    const { author, poll } = this.props

    return (
      <PollWrapper headerText={`${author.name} asked:`} authorAvatar={author.avatarURL}>
        <Card.Title as="h1">Would you rather...</Card.Title>
        <Form id="poll" onSubmit={this.handleSubmit}>
          <Form.Check
            type="radio"
            label={poll.optionOne}
            name="answerGroup"
            id="optionOne"
            onChange={this.handleChange}
            required
          />
          <Form.Check
            className="mt-3"
            type="radio"
            label={poll.optionTwo}
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

export default PollVoter