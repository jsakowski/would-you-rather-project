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

    if (returnTab !== undefined) {
      this.props.history.replace({ ...this.props.location.pathname, state: {} });
    }

    const tab = returnTab === undefined ? 'unanswered' : returnTab

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
}

export default withRouter(connect(mapStateToProps)(Home))