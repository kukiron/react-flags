import { AUTH_USER, UNAUTH_USER, DELETE_USER, UPDATE_USER } from "../actions/constants"

// Reducer for user authentication events
export default (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case AUTH_USER:
      return { ...state, authenticated: true, loginErrorMsg: "", signupErrorMsg: "" }

    case UNAUTH_USER:
      return { ...state, authenticated: false }

    case UPDATE_USER:
      return { ...state, updateSuccess: payload }

    case DELETE_USER:
      return { ...state, deleteSuccess: payload }

    default:
      return state
  }
}
