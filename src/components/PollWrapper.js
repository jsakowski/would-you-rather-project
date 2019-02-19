import React from 'react'
import { Card, CardHeader, CardBody, CardImg, Container, Row, Col, Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const PollWrapper = (props) => {
  const { headerText, authorAvatar, isCancelButton } = props
  const { returnTab } = props.location.state || { returnTab: undefined }
  const returnState = returnTab !== undefined ? { returnTab: returnTab } : {}

  return (
    <Card className='poll-card'>
      <CardHeader>
        {headerText}
        {
          isCancelButton &&
          <Link to={{
            pathname: '/',
            state: returnState
          }}><Button close /></Link>
        }
      </CardHeader>
      <CardBody>
        <Container fluid>
          <Row>
            <Col xs={4} md={4}>
              <CardImg className='img-avatar-medium' src={authorAvatar} />
            </Col>
            <Col xs={8}>
              {props.children}
            </Col>
          </Row>
        </Container>
      </CardBody>
    </Card>
  )
}

PollWrapper.propTypes = {
  headerText: PropTypes.string.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  isCancelButton: PropTypes.bool,
}

export default withRouter(PollWrapper)
