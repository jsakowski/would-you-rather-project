import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { CardTitle, CardText, Button } from 'reactstrap';
import PropTypes from 'prop-types'
import PollWrapper from './PollWrapper'
import { getPollAuthor } from '../utils/pollHelper'


class PollSummary extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    homeTab: PropTypes.string.isRequired,
  }

  hadleViewPoll = (e) => {
    const {history, id, homeTab} = this.props

    e.preventDefault()
    history.push({
      pathname: `/question/${id}`,
      state: { returnTab: homeTab }
    })
  }

  render() {
    const {name, avatarURL, text} = this.props
    return (
      <PollWrapper headerText={`${name} asked:`} authorAvatar={avatarURL}>
        <CardTitle tag='h5'>Would you rather</CardTitle>
        <CardText>{text}...</CardText>
        <Button color='primary' className='btn-block' onClick={this.hadleViewPoll}>View Poll</Button>
      </PollWrapper>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const poll = questions[id]

  return {
    ...getPollAuthor(users[poll.author]),
    text: poll.optionOne.text,
  }
}

export default withRouter(connect(mapStateToProps)(PollSummary))