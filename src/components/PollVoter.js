import React, { Component } from 'react'
import PollWrapper from './PollWrapper'
import PropTypes from 'prop-types'
import { CardTitle, Button, Form, FormGroup, Label, Input } from 'reactstrap'

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
    e.stopPropagation()

    const { answer } = this.state
    const { handleSaveAnswer, poll } = this.props

    handleSaveAnswer(poll.id, answer)
  }

  render () {
    const { author, poll } = this.props
    console.log('PollVoter.render', author, poll)

    return (
      <PollWrapper headerText={`${author.name} asked:`} authorAvatar={author.avatarURL} isCancelButton={true}>
        <CardTitle tag='h1'>Would you rather...</CardTitle>
        <Form id='poll' onSubmit={this.handleSubmit}>
          <FormGroup key='optionOne' check>
            <Input
              type='radio'
              name='answerGroup'
              id='optionOne'
              onChange={this.handleChange}
              required />
            <Label check>{poll.optionOne}</Label>
          </FormGroup>
          <FormGroup key='optionTwo' className='mt-2' check>
            <Input
              type='radio'
              name='answerGroup'
              id='optionTwo'
              onChange={this.handleChange}
              required />
            <Label check>{poll.optionTwo}</Label>
          </FormGroup>
          <Button className='mt-4 btn-block' color='primary' type='submit'>Submit</Button>
        </Form>
      </PollWrapper>
    )
  }
}

export default PollVoter