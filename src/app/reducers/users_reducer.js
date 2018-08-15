import { FETCH_USERS, FETCH_DATA } from "../actions/constants"

// Reducer for fetching user data
export default (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_USERS:
      return { ...state, usersList: payload }

    case FETCH_DATA:
      return { ...state, userAccess: payload }

    default:
      return state
  }
}
