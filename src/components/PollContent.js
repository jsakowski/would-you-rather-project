import React from 'react'
import PropTypes from 'prop-types'
import { TabPane, Alert } from 'reactstrap'
import PollList from './PollList'


const PollContent = (props) => {
  const {activeTab, tabId, polls, noPollsText} = props
  return (
    <TabPane tabId={tabId} className={activeTab === tabId ? 'show active' : ''}>
      {
        polls.length > 0
          ? <PollList items={polls} homeTab={tabId} />
          : <Alert color='info' className='mt-3'>
            {noPollsText}
          </Alert>
      }
    </TabPane>
  )
}

PollContent.propTypes = {
  activeTab: PropTypes.string.isRequired,
  tabId: PropTypes.string.isRequired,
  polls: PropTypes.array.isRequired,
  noPollsText: PropTypes.object.isRequired,
}


export default PollContent