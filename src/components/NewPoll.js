import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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
      validated: false,
    }))
  }

  handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();

      this.setState(() => ({
        validated: true,
      }))
    }
    else {
      const { optionOne, optionTwo } = this.state
      const { dispatch } = this.props
      dispatch(handleSaveQuestion(optionOne, optionTwo))

      this.setState(() => ({
        optionOne: '',
        optionTwo: '',
      }))
    }
  }

  render() {
    const { validated, optionOne, optionTwo } = this.state;

    return (
      <Card>
        <Card.Header as="h1">Create New Question</Card.Header>
        <Card.Body>
          <p>Complete the question:</p>
          <Card.Title>Would you rather...</Card.Title>
          <Form
            noValidate
            validated={validated}
            onSubmit={this.handleSubmit}
          >
            <Form.Group controlId="optionOne">
              <Form.Control
                type="text"
                placeholder="Enter option one text here"
                required
                name="optionOne"
                value={optionOne}
                onChange={this.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                    Please enter option one text.
              </Form.Control.Feedback>
            </Form.Group>
            <p>OR</p>
            <Form.Group controlId="optionTwo">
              <Form.Control
                type="text"
                placeholder="Enter option two text here"
                required
                name="optionTwo"
                value={optionTwo}
                onChange={this.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter option two text.
              </Form.Control.Feedback>
              </Form.Group>
              <Button className="mt-4" variant="primary btn-block" type="submit">Submit</Button>
            </Form>
          </Card.Body>
        </Card>
     )
  }
}

export default connect()(NewPoll)