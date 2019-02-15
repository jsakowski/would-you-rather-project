import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Nav, NavItem, NavLink, TabContent, TabPane, Alert } from 'reactstrap'
import PollList from './PollList'

const tabs = [
  {
    id: 'unanswered',
    name: 'Unanswered Questions',
    emptyText:
      <Fragment>
        <h4 className='alert-heading'>Well done!</h4>
        <p>
          No more questions to answer. I’m sure you’ll add at least
          a few would you rather questions that are really hard to answer!
          Some can be ridiculous, some quite deep, while others - just fun to answer.
        </p>
      </Fragment>
  },
  {
    id: 'answered',
    name: 'Answered Questions',
    emptyText:
      <Fragment>
      <p>You did not answer any questions yet.
        The perfect list of carefully chosen would you rather questions are wating for you.
      </p>
      </Fragment>
  }
]

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

  handleToggle = (e) => {
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
            <NavItem key={tab.id}>
              <NavLink
                href={`#${tab.id}`}
                id={tab.id}
                className={activeTab === tab.id ? 'active' : ''}
                onClick={(e) => { this.handleToggle(e) }}
              >
                {tab.name}
            </NavLink>
            </NavItem>
         ))
        }
        </Nav>
        <TabContent activeTab={activeTab}>
          {
            tabs.map((tab) => (
              <TabPane tabId={tab.id} key={tab.id} className={activeTab === tab.id ? 'show active' : ''}>
              {
                this.props[tab.id].length > 0
                  ? <PollList items={this.props[tab.id]} homeTab={tab.id} />
                  : <Alert color='info' className='mt-3'>
                      {tab.emptyText}
                    </Alert>
              }
              </TabPane>
            ))
          }
        </TabContent>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  let answeredIds = Object.keys(users[authedUser].answers)

  return {
    answered: answeredIds
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),

    unanswered: Object.keys(questions)
      .filter(id => !answeredIds.includes(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  }
}

export default withRouter(connect(mapStateToProps)(Home))