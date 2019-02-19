import React from 'react'
import { Link } from 'react-router-dom'
import { CardTitle, CardBody, CardText } from 'reactstrap';
import PropTypes from 'prop-types'


const PollSummary = (props) => {
  const { poll, homeTab } = props
  return (
    <CardBody>
      <CardTitle>Would you rather</CardTitle>
      <CardText tag='h5'>{poll.optionOne.text}...</CardText>
      <Link
        className='btn-block btn btn-primary mt-3'
        to={{
          pathname: `/questions/${poll.id}`,
          state: { returnTab: homeTab }
      }}>View Poll</Link>
    </CardBody>
  )
}


PollSummary.propTypes = {
  poll: PropTypes.object.isRequired,
  homeTab: PropTypes.string.isRequired,
}

export default PollSummary