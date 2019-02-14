import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, NavItem, NavLink, TabContent, TabPane, Alert } from 'reactstrap'
import Category from './Category'
import { setHomeActiveTab } from  '../actions/homeState'

class Home extends Component {
toggle = (e) => {
    e.preventDefault();
    e.stopPropagation()

    const { dispatch, activeTab } = this.props

    const tab = e.target.id
    if (activeTab !== tab) {
      dispatch(setHomeActiveTab(tab))
    }
  }

  render() {
    const { answeredIds, unansweredIds, activeTab } = this.props

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
            {
              unansweredIds.length > 0
                ? <Category items={unansweredIds} />
                : <Alert color='success' className='mt-3'>
                  <h4 className='alert-heading'>Well done!</h4>
                  <p>
                    No more questions to answer. I’m sure you’ll add at least
                    a few would you rather questions that are really hard to answer!
                    Some can be ridiculous, some quite deep, while others - just fun to answer.
                  </p>
                </Alert>
             }
          </TabPane>
          <TabPane tabId='answered' className={activeTab === 'answered' ? 'show active': ''}>
            {
              answeredIds.length > 0
                ? <Category items={answeredIds} />
                : <Alert color='warning' className='mt-3'>
              <p>
                You did not answer any questions yet.
                The perfect list of carefully chosen would you rather questions are wating for you.
                  </p>
            </Alert>
           }
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