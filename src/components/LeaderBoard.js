import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, CardBody, CardImg, CardTitle, Row, Col, Badge } from 'reactstrap'

class LeaderBoard extends Component {
  render() {
    const { users } = this.props
    const sortedUsers = Object.values(users)
      .map((user) => {
        const questionsTotal = user.questions.length
        const answersTotal = Object.keys(user.answers).length

        return {
          id: user.id,
          name: user.name,
          avatarURL: user.avatarURL,
          questionsTotal: questionsTotal,
          answersTotal: answersTotal,
          score: questionsTotal + answersTotal
        }
      })
      .sort((a, b) => b.score - a.score)

    return (
      <Fragment>
        <h1>Leader Board</h1>
        <ul className='list-unstyled'>
        {
            sortedUsers.map((user) => (
              <li key={user.id} className='pt-3'>
                <Card>
                  <CardBody>
                    <Row className='no-gutters'>
                      <Col xs={4} md={3}>
                        <CardImg className='img-avatar-medium' src={user.avatarURL} />
                      </Col>
                      <Col xs={5} md={6} className='pr-4'>
                        <CardTitle className='mb-4' tag='h3'>{user.name}</CardTitle>
                        <div className='mt-5 clearfix'>
                          <div className='float-left'>Answered questions </div>
                          <div className='float-right pr-4'>{user.answersTotal}</div>
                        </div>
                        <div className='mt-2 clearfix'>
                          <div className='float-left'>Created questions </div>
                          <div className='float-right pr-4'>{user.questionsTotal}</div>
                        </div>
                      </Col>
                      <Col xs={3}>
                        <Card className='text-center score'>
                          <CardHeader>Score</CardHeader>
                          <CardBody>
                            <Badge className='p-4 rounded-circle' color='success'>
                              <p className='font-weight-bold score-text'>{user.score}</p>
                            </Badge>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                </CardBody>
                </Card>
              </li>
          ))
        }
        </ul>
      </Fragment>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users
  }
}
export default connect(mapStateToProps)(LeaderBoard);
