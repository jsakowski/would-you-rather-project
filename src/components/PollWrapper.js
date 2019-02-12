import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const PollWraper = (props) => {
  const { author, authorAvatar} = props

  return (
    <Card className="text-left">
      <Card.Header>{author} asks:</Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col xs={4} md={4}><Card.Img variant="left" className="img-avatar-medium" src={authorAvatar} /></Col>
            <Col xs={8}>
              {props.children}
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
}

export default PollWraper
