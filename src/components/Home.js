import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import Category from './Category'
import { setHomeActiveTab } from  '../actions/homeState'

class Home extends Component {
  // state = {
  //   activeTab: this.props.activeTab,
  // }

  toggle = (e) => {
    e.preventDefault();
    e.stopPropagation()

    // const { activeTab } = this.state
    const { dispatch, activeTab } = this.props

    const tab = e.target.id
    if (activeTab !== tab) {
      // this.setState({
      //   activeTab: tab,
      // });
      dispatch(setHomeActiveTab(tab))
    }
  }

  render() {
    const { answeredIds, unansweredIds, activeTab } = this.props
    // const { activeTab } = this.state

    return (
      <div>
        <Nav tabs className='nav-fill'>
          <NavItem>
            <NavLink
              href='#unanswered'
              id='unanswered'
              className={activeTab === 'unanswered' ? 'active': ''}
              onClick={(e) => { this.toggle(e) }}
            >
              Unanswered Questions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href='#answered'
              id='answered'
              className={activeTab === 'answered' ? 'active' : ''}
              onClick={(e) => { this.toggle(e) }}
            >
              Answered Questions
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='unanswered' className={activeTab === 'unanswered' ? 'show active': ''}>
            <Category items={unansweredIds} />
          </TabPane>
          <TabPane tabId='answered' className={activeTab === 'answered' ? 'show active': ''}>
            <Category items={answeredIds} />
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions, homeState }) {
  let answeredIds = authedUser === null ? [] : Object.keys(users[authedUser].answers)

  return {
    answeredIds: answeredIds
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),

    unansweredIds: Object.keys(questions)
      .filter(id => !answeredIds.includes(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),

    activeTab: homeState
  }
}

export default connect(mapStateToProps)(Home)