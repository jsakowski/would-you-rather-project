import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CardTitle, CardBody, Button, Form, FormGroup, CustomInput, FormFeedback } from 'reactstrap'
import { Formik } from 'formik'
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  answer: yup.string().required('Please select one of the options'),
})

class UnansweredPoll extends Component {
  static propTypes = {
    poll: PropTypes.object.isRequired,
    handleSaveAnswer: PropTypes.func.isRequired,
  }


  submitForm = (values) => {
    const { answer } = values
    const { handleSaveAnswer, poll } = this.props

    handleSaveAnswer(poll.id, answer)
  }

  renderForm = (props) => {
    const { poll } = this.props

    return (
      <Form id='poll' onSubmit={props.handleSubmit}>
        <FormGroup key='optionOne' check>
          <CustomInput
            type='radio'
            name='answer'
            id='optionOne'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            invalid={props.errors.answer && props.touched.answer}
            valid={!props.errors.answer && props.touched.answer}
            label={poll.optionOne.text}
            value='optionOne'
          />
        </FormGroup>
        <FormGroup key='optionTwo' className='mt-2' check>
          <CustomInput
            type='radio'
            name='answer'
            id='optionTwo'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            invalid={props.errors.answer && props.touched.answer}
            valid={!props.errors.answer && props.touched.answer}
            label={poll.optionTwo.text}
            value='optionTwo'
          >
            <FormFeedback>{props.errors.answer}</FormFeedback>
          </CustomInput>
        </FormGroup>
        <Button className='mt-4 btn-block' color='primary' type='submit'>Submit</Button>
      </Form>
    )
  }

  render() {
    return (
      <CardBody>
        <CardTitle tag='h1'>Would you rather...</CardTitle>
        <Formik
          initialValues={{
            answer: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            this.submitForm(values)
            setSubmitting(true)
          }}>
          {this.renderForm}
        </Formik>
      </CardBody>
    )
  }
}

export default UnansweredPoll