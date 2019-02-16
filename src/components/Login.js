import React, { Component } from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, Form, FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../actions/authedUser'

class Login extends Component {
  state = {
    user: null,
    redirectToReferrer: false,
  }

  onChange = (e) => {
    e.preventDefault()
    const user = e.target.value

    this.setState({
      user,
    })
  }

  onSubmit = (e) => {
    const { dispatch } = this.props
    e.preventDefault();

    dispatch(login(this.state.user))
    this.setState({
      redirectToReferrer: true,
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { users } = this.props
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <Card>
        <CardBody>
          <CardTitle tag='h1'>Welcome to the Would You Rather App</CardTitle>
          <CardSubtitle tag='h6' className='mt-4'>Please log in to continue</CardSubtitle>
          <Form className='mt-4' onSubmit={this.onSubmit}>
            <FormGroup>
              <Input type="select" name="user" id="user" onChange={this.onChange} required>
                <option key='empty' value=''>Please select an user</option>
                {
                  users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))
                }
             </Input>
            </FormGroup>
            <Button className='btn-block' color='primary' type='submit'>Log in</Button>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  }
}

export default connect(mapStateToProps)(Login)