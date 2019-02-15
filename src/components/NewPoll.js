import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, Form, FormGroup, FormFeedback, Input, Button } from 'reactstrap'
import { handleSaveQuestion } from '../actions/questions'

class NewPoll extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    validated: false,
  }

  handleChange = (e) => {
    const id = e.target.id
    const text = e.target.value

    this.setState(() => ({
      [id]: text,
    }))
  }

  handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    else {
      const { optionOne, optionTwo } = this.state
      const { dispatch } = this.props
      dispatch(handleSaveQuestion(optionOne, optionTwo))

      this.setState(() => ({
        optionOne: '',
        optionTwo: '',
      }))

      this.props.history.push('/')
    }

    this.setState(() => ({
      validated: true
    }))
  }


  render() {
    const { validated, optionOne, optionTwo } = this.state;
    const variant = validated ? 'was-validated' : ''

    console.log('NewPoll - render')

    return (
      <Card>
        <CardHeader tag='h1'>Create New Question</CardHeader>
        <CardBody>
          <p>Complete the question:</p>
          <CardTitle tag='h2'>Would you rather...</CardTitle>
          <Form className={`needs-validation ${variant}`} onSubmit={this.handleSubmit} noValidate>
            <FormGroup>
              <Input
                type='text'
                name='optionOne'
                id='optionOne'
                value={optionOne}
                placeholder='Enter option one text here'
                onChange={this.handleChange}
                required
              />
              <FormFeedback>Please enter option one text.</FormFeedback>
            </FormGroup>
            <p>OR</p>
            <FormGroup>
              <Input
                type='text'
                name='optionTwo'
                id='optionTwo'
                value={optionTwo}
                placeholder='Enter option two text here'
                onChange={this.handleChange}
                required
              />
              <FormFeedback>Please enter option two text.</FormFeedback>
            </FormGroup>
            <Button className='btn-block' color='primary'>Submit</Button>
          </Form>
          </CardBody>
        </Card>
     )
  }
}

export default withRouter(connect()(NewPoll))