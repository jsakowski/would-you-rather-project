import React, { Component } from 'react'
import { Card, CardHeader, CardBody, CardImg, Container, Row, Col, Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'


class PollWrapper extends Component {
  static propTypes = {
    headerText: PropTypes.string.isRequired,
    authorAvatar: PropTypes.string.isRequired,
    isCancelButton: PropTypes.bool,
  }

  render () {
    const { headerText, authorAvatar, isCancelButton} = this.props
    const returnTab =
      this.props === undefined || this.props.location === undefined || this.props.location.state === undefined
        ? undefined
        : this.props.location.state.returnTab
    const returnState = returnTab !== undefined ? { returnTab: returnTab } : {}

    return (
      <Card>
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
          <Container>
            <Row>
              <Col xs={4} md={4}>
                <CardImg className='img-avatar-medium' src={authorAvatar} />
              </Col>
              <Col xs={8}>
                {this.props.children}
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    )
  }
}

export default withRouter(PollWrapper)
