import React, { Component } from 'react'
import { Card, CardHeader, CardBody, CardImg, Container, Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'


class PollWrapper extends Component {
  static propTypes = {
    headerText: PropTypes.string.isRequired,
    authorAvatar: PropTypes.string.isRequired,
    isCancelButton: PropTypes.bool,
  }

  handleCancel() {
    const { location }  = this.props
    const returnTab = location.state === undefined ? undefined : location.state.returnTab
    const returnState = returnTab !== undefined ? { returnTab: returnTab } : {}

    this.props.history.push({
      pathname: '/',
      state: returnState
    })
  }

  render () {
    const { headerText, authorAvatar, isCancelButton} = this.props

    return (
      <Card>
        <CardHeader>
          {headerText}
          {
            isCancelButton === true
              ? <Button close onClick={() => this.handleCancel()} />
              : null
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
