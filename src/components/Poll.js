import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from  'react-bootstrap/Button'

class Poll extends Component {
  render () {
    const { authedUser, poll } = this.props

    return (
      <Card className="text-left">
        <Card.Header>{poll.author} asks:</Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col xs={4} md={4}><Card.Img variant="left" className="img-avatar-medium" src={poll.avatarURL} /></Col>
              <Col xs={8}>
                <Card.Title>Would you rather</Card.Title>
                <Card.Text>{poll.text}</Card.Text>
                <Button variant="primary btn-block">View Poll</Button>
              </Col>
            </Row>
          </Container>



        </Card.Body>
      </Card>
    )
  }

}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const poll = questions[id]
  const author = users[poll.author]
  return {
    authedUser,
    poll: {
      author: author.name,
      avatarURL: author.avatarURL,
      text: poll.optionOne.text,
    }
  }
}

export default connect(mapStateToProps)(Poll)