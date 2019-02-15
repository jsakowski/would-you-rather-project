import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, CardBody, CardImg, CardTitle, Row, Col, Badge } from 'reactstrap'
import { getLeaders } from '../reducers'

const LeaderBoard = (props) => {
  const { leaders } = props

  return (
      <Fragment>
        <h1>Leader Board</h1>
        <ul className='list-unstyled'>
        {
          leaders.map((user) => (
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

function mapStateToProps(state) {
  return { leaders: getLeaders(state) }
}

export default connect(mapStateToProps)(LeaderBoard);
