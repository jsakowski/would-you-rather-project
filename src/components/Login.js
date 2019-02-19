import React, { Component } from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, Form, FormGroup, Input, Button, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup';
import { login } from '../actions/authedUser'
import { getUsers } from '../reducers'

const validationSchema = yup.object().shape({
  user: yup.string().required('Please select an user to impersonate'),
})

class Login extends Component {
  state = {
    redirectToReferrer: false,
  }

  submitForm = (values) => {
    const { dispatch } = this.props
    const { user } = values

    dispatch(login(user))
    this.setState({
      redirectToReferrer: true,
    })
  }

  renderForm = (props) => {
    const { users } = this.props

    return (
      <Form className='mt-4' onSubmit={props.handleSubmit}>
        <FormGroup>
          <Input
            type="select"
            name="user"
            id="user"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.user}
            invalid={props.errors.user && props.touched.user}
            valid={!props.errors.user && props.touched.user}
          >
            <option key='empty' value=''>Please select an user</option>
            {
              users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
            }
          </Input>
          <FormFeedback>{props.errors.user}</FormFeedback>
        </FormGroup>
        <Button className='btn-block mt-3' color='primary' type='submit' >Log in</Button>
      </Form>
    )
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <Card>
        <CardBody>
          <CardTitle tag='h1'>Welcome to the Would You Rather App</CardTitle>
          <CardSubtitle tag='h6' className='mt-4'>Please log in to continue</CardSubtitle>
          <Formik
            initialValues={{
              user: '',
            }}
            validationSchema={validationSchema}
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

function mapStateToProps(state) {
  return {
    users: getUsers(state)
  }
}

export default connect(mapStateToProps)(Login)