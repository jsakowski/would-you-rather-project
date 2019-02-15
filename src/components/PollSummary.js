import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CardTitle, CardText } from 'reactstrap';
import PropTypes from 'prop-types'
import PollWrapper from './PollWrapper'
import { getUser } from '../utils/pollHelper'


const PollSummary = (props) => {
  const { name, avatarURL, text, id, homeTab } = props
  return (
    <PollWrapper headerText={`${name} asked:`} authorAvatar={avatarURL}>
      <CardTitle tag='h5'>Would you rather</CardTitle>
      <CardText>{text}...</CardText>
      <Link
        className='btn-block btn btn-primary'
        to={{
          pathname: `/question/${id}`,
          state: { returnTab: homeTab }
      }}>View Poll</Link>
    </PollWrapper>
  )
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const poll = questions[id]

  return {
    ...getUser(users[poll.author]),
    text: poll.optionOne.text,
  }
}

PollSummary.propTypes = {
  id: PropTypes.string.isRequired,
  homeTab: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(PollSummary)