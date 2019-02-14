import { SET_HOME_ACTIVE_TAB } from '../actions/homeState'

export default function homeState(state = 'unanswered', action) {
  switch (action.type) {
    case SET_HOME_ACTIVE_TAB:
      return action.activeTab
    default:
      return state
  }
}