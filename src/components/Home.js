import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Nav, TabContent } from 'reactstrap'
import PollContent from './PollContent'
import PollTabLink from './PollTabLink'
import { tabs } from '../utils/HomeTabs'
import { getQuestionIds } from '../reducers'

class Home extends Component {
  state = {
    activeTab: null
  }

  toggle = (tab) => {
    const { activeTab } = this.state

    if (activeTab !== tab) {
      this.setState(() => ({
        activeTab: tab
      }))
    }
  }

  componentDidMount = () => {
    const { returnTab } = this.props.location.state || { returnTab: undefined }
    console.log('Home - componentDidMount- returnTab', returnTab)

    //const returnTab = this.props.location.state === undefined ? undefined : this.props.location.state.returnTab

    if (returnTab !== undefined) {
      this.props.history.replace({ ...this.props.location.pathname, state: {} });
    }

    const tab = returnTab === undefined ? 'unanswered' : returnTab
    console.log('Home - componentDidMount', tab, this.state.activeTab)
    this.toggle(tab)
  }

  handleSwitch = (e) => {
    e.preventDefault();
    e.stopPropagation()

    const tab = e.target.id
    this.toggle(tab)
  }

  render() {
    const { activeTab } = this.state

    console.log('Home - render', activeTab)

    if (activeTab == null)
      return null

    return (
      <div>
        <Nav tabs className='nav-fill'>
       {
          tabs.map((tab) => (
            <PollTabLink
              key={tab.id}
              activeTab={activeTab}
              tabId={tab.id}
              tabName={tab.name}
              handleSwitch={this.handleSwitch}
            />
         ))
        }
        </Nav>
        <TabContent activeTab={activeTab}>
          {
            tabs.map((tab) => (
              <PollContent
                key={tab.id}
                activeTab={activeTab}
                tabId={tab.id}
                polls={this.props[tab.id]}
                noPollsText={tab.emptyText} />
            ))
          }
        </TabContent>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return getQuestionIds(state)
  // const answeredIds = Object.keys(users[authedUser].answers)

  // return {
  //   answered: answeredIds
  //     .sort((a, b) => questions[b].timestamp - questions[a].timestamp),

  //   unanswered: Object.keys(questions)
  //     .filter(id => !answeredIds.includes(id))
  //     .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  // }
}

export default withRouter(connect(mapStateToProps)(Home))