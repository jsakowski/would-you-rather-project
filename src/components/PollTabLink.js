import React from 'react'
import PropTypes from 'prop-types'
import { NavItem, NavLink } from 'reactstrap'


const PollTabLink = (props) => {
  const { activeTab, tabId, tabName, handleSwitch } = props
  return (
    <NavItem key={tabId}>
      <NavLink
        href={`#${tabId}`}
        id={tabId}
        className={activeTab === tabId ? 'active' : ''}
        onClick={handleSwitch}
      >
        {tabName}
      </NavLink>
    </NavItem>
  )
}

PollTabLink.propTypes = {
  activeTab: PropTypes.string.isRequired,
  tabId: PropTypes.string.isRequired,
  tabName: PropTypes.string.isRequired,
  handleSwitch: PropTypes.func.isRequired,
}

export default PollTabLink