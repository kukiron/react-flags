import { combineReducers } from "redux"

// Import reducers
import authReducer from "./auth_reducer"
import errorsReducer from "./errors_reducer"
import usersReducer from "./users_reducer"

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  users: usersReducer
})

export default rootReducer
