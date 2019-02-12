import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Category from './Category'

class Home extends Component {
  state = {
    key: 'unanswered',
  }

  render() {
    const { answeredIds, unansweredIds } = this.props

    return(
      <Tabs fill
        activeKey={this.state.key}
        onSelect={key => this.setState({ key })}>
       <Tab eventKey="unanswered" title="Unanswered Questions">
          <Category items={unansweredIds} />
        </Tab>
        <Tab eventKey="answered" title="Answered Questions">
          <Category items={answeredIds} />
        </Tab>
      </Tabs>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  let answeredIds = Object.keys(users[authedUser].answers)

  return {
    answeredIds: answeredIds
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),

    unansweredIds: Object.keys(questions)
      .filter(id => !answeredIds.includes(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Home)