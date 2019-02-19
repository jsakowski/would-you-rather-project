import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, Form, FormGroup, FormFeedback, Input, Button } from 'reactstrap'
import { Formik, validateYupSchema, yupToFormErrors} from 'formik'
import * as yup from 'yup';
import { handleSaveQuestion } from '../actions/questions'

const getValidationSchema = (values) => {
  return yup.object().shape({
    optionOne: yup.string()
      .required('Please enter option one text')
      .min(3, 'Answer option should be longer than 2 characters'),

    optionTwo: yup.string()
      .required('Please enter option two text')
      .min(3, 'Answer option should be longer than 2 characters')
      .notOneOf([values.optionOne], 'Answer options should not be the same'),
  })
}

class NewPoll extends Component {

  validate = (values) => {
    const validationSchema = getValidationSchema(values)

    try {
      validateYupSchema(values, validationSchema, true, {});
    }
    catch (err) {
      return yupToFormErrors(err);
    }
    return {};
  }

  submitForm = (values) => {
    const { optionOne, optionTwo } = values
    const { dispatch } = this.props
    dispatch(handleSaveQuestion(optionOne, optionTwo))

    this.props.history.push('/')
  }

  renderForm = (props) => {
    return (
      <Form onSubmit={props.handleSubmit} >
        <FormGroup>
          <Input
            type='text'
            name='optionOne'
            id='optionOne'
            placeholder='Enter option one text here'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.optionOne}
            invalid={props.errors.optionOne && props.touched.optionOne}
            valid={!props.errors.optionOne && props.touched.optionOne}
         />
          <FormFeedback>{props.errors.optionOne}</FormFeedback>
        </FormGroup>
        <p>OR</p>
        <FormGroup>
          <Input
            type='text'
            name='optionTwo'
            id='optionTwo'
            placeholder='Enter option two text here'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.optionTwo}
            invalid={props.errors.optionTwo && props.touched.optionTwo}
            valid={!props.errors.optionTwo && props.touched.optionTwo}
          />
          <FormFeedback>{props.errors.optionTwo}</FormFeedback>
        </FormGroup>
        <Button className='btn-block' color='primary' type='submit'>Submit</Button>
      </Form>
     )
  }

  render() {
    return (
      <Card>
        <CardHeader tag='h1'>Create New Question</CardHeader>
        <CardBody>
          <p>Complete the question:</p>
          <CardTitle tag='h2'>Would you rather...</CardTitle>
          <Formik
            initialValues={{
              optionOne: '',
              optionTwo: '',
            }}
            validate={this.validate}
            onSubmit={(values, { setSubmitting }) => {
              this.submitForm(values)
              setSubmitting(true)
            }}>
            {this.renderForm}
          </Formik>

         </CardBody>
        </Card>
     )
  }
}

export default withRouter(connect()(NewPoll))