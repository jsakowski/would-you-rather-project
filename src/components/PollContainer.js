import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../reducers'
import { handleSaveQuestionAnswer } from '../actions/questions'
import PollSummary from './PollSummary'
import AnsweredPoll from './AnsweredPoll'
import UnansweredPoll from './UnansweredPoll'
import PollWrapper from './PollWrapper'
import NotFound from './NotFound'

class PollContainer extends Component {

  handleSaveAnswer = (id, answer) => {
    const { dispatch } = this.props
    dispatch(handleSaveQuestionAnswer(id, answer))
  }

  renderElement = (props) => {
    const { type, vote } = props

    switch (type) {
      case 'summary':
        return <PollSummary {...props} />

      default:
        return (vote === 0)
          ? <UnansweredPoll handleSaveAnswer={this.handleSaveAnswer} {...props} />
          : <AnsweredPoll {...props} />
    }
  }

  render () {
    const { author, isCancelButton = true, ...rest } = this.props
    const { poll } = this.props

    if (poll === null)
      return <NotFound />

    return (
      <PollWrapper headerText={`Asked by ${author.name}`} authorAvatar={author.avatarURL} isCancelButton={isCancelButton}>
        {this.renderElement(rest)}
      </PollWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match !== undefined ? ownProps.match.params : ownProps

  return formatQuestion(state, id)
}

export default connect(mapStateToProps)(PollContainer)

