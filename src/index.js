import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"

import "./index.css"
import App from "./App"
import NavBar from "./app/components/navbar"
import rootReducer from "./app/reducers"
import { AUTH_USER } from "./app/actions/constants"
import { fetchUserAccess } from "./app/actions"
import registerServiceWorker from "./registerServiceWorker"

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk))
const token = localStorage.getItem("token")
// If users have tokens, they should be authenticated and app state updated
// token && store.dispatch({ type: AUTH_USER })
if (token) {
  store.dispatch({ type: AUTH_USER })
  store.dispatch(fetchUserAccess())
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div className="container">
        <NavBar />
        <App />
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
)
registerServiceWorker()
