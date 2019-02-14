import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import Category from './Category'

class Home extends Component {
  state = {
    activeTab: 1,
  }

  toggle = (e) => {
    e.preventDefault();
    const { activeTab } = this.state
    const tab = e.target.id
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { answeredIds, unansweredIds } = this.props
    const { activeTab } = this.state

    return (
      <div>
        <Nav tabs className='nav-fill'>
          <NavItem key='unanswered'>
            <NavLink
              href='#unanswered'
              id='1'
              className={activeTab === 1 ? 'active': ''}
              onClick={(e) => { this.toggle(e) }}
            >
              Unanswered Questions
            </NavLink>
          </NavItem>
          <NavItem key='answered'>
            <NavLink
              href='#answered'
              id='2'
              className={activeTab === 2 ? 'active' : ''}
              onClick={(e) => { this.toggle(e) }}
            >
              Answered Questions
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1' className={activeTab === 1 ? 'show active': ''}>
            <Category items={unansweredIds} />
          </TabPane>
          <TabPane tabId='2' className={activeTab === 2 ? 'show active': ''}>
            <Category items={answeredIds} />
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  let answeredIds = authedUser === null ? [] : Object.keys(users[authedUser].answers)

  return {
    answeredIds: answeredIds
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),

    unansweredIds: Object.keys(questions)
      .filter(id => !answeredIds.includes(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Home)