import React from 'react'
import { Card, CardHeader, CardBody, CardImg, Container, Row, Col, Button } from 'reactstrap';

const PollWraper = (props) => {
  const { headerText, authorAvatar} = props
  console.log('PollWraper: render', headerText, authorAvatar)

  return (
    <Card>
      <CardHeader>
        {headerText}
        <Button close />
      </CardHeader>
      <CardBody>
        <Container>
          <Row>
            <Col xs={4} md={4}><CardImg variant='left' className='img-avatar-medium' src={authorAvatar} /></Col>
            <Col xs={8}>
              {props.children}
            </Col>
          </Row>
        </Container>
      </CardBody>
    </Card>
  )
}

export default PollWraper
