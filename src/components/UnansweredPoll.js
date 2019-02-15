import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap'

class UnansweredPoll extends Component {
  static propTypes = {
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

  render() {
    const { poll } = this.props

    return (
      <CardBody>
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
      </CardBody>
    )
  }
}

export default UnansweredPoll