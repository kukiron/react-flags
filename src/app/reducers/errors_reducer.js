import {
  LOGIN_ERROR,
  SIGNUP_ERROR,
  REMOVE_ERROR,
  DELETE_ERROR,
  UPDATE_ERROR
} from "../actions/constants"

const initialState = {}

// Reducer for error generating events
export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_ERROR:
      return { ...state, loginErrorMsg: payload }

    case SIGNUP_ERROR:
      return { ...state, signupErrorMsg: payload }

    case DELETE_ERROR:
      return { ...state, deleteErrorMsg: payload }

    case UPDATE_ERROR:
      return { ...state, updateErrorMsg: payload }

    case REMOVE_ERROR:
      return initialState

    default:
      return state
  }
}
