export const GET_USERS = 'GET_USERS'

export function loadUsers(users) {
  return {
    type: GET_USERS,
    users,
  }
}



