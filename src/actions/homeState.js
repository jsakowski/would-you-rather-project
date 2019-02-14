export const SET_HOME_ACTIVE_TAB = 'SET_HOME_ACTIVE_TAB'

export function setHomeActiveTab(activeTab = 'unanswered') {
  return {
    type: SET_HOME_ACTIVE_TAB,
    activeTab,
  }
}