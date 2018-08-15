import axios from "axios"

import {
  FETCH_USERS,
  FETCH_DATA,
  AUTH_USER,
  UNAUTH_USER,
  DELETE_USER,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  DELETE_ERROR,
  REMOVE_ERROR,
  UPDATE_USER,
  UPDATE_ERROR
} from "./constants"

const ROOT_URL = "https://react-flags-api.herokuapp.com"
// For running server on local machine use the following url enpoint
// const ROOT_URL = "http://localhost:3090"

// Register for the app
export const signupUser = ({ username, email, password, access, history }) => async dispatch => {
  try {
    const response = await axios.post(`${ROOT_URL}/signup`, {
      username,
      email,
      password,
      access
    })
    dispatch({ type: AUTH_USER })
    localStorage.setItem("token", response.data.token)
    history.push("/flags")
  } catch ({ response }) {
    dispatch({
      type: SIGNUP_ERROR,
      payload: response.data.error
    })
  }
}

// Add new user by admin
export const addUser = ({ username, email, password, access, history }) => async dispatch => {
  try {
    await axios.post(`${ROOT_URL}/signup`, {
      username,
      email,
      password,
      access
    })
    dispatch({ type: AUTH_USER })
    history.push("/users")
  } catch ({ response }) {
    dispatch({
      type: SIGNUP_ERROR,
      payload: response.data.error
    })
  }
}

// Authenticate current users
export const loginUser = ({ email, password, history }) => async dispatch => {
  try {
    const response = await axios.post(`${ROOT_URL}/login`, {
      email,
      password
    })
    dispatch({ type: AUTH_USER })
    localStorage.setItem("token", response.data.token)
    history.push("/flags")
  } catch (err) {
    console.log(err)
    dispatch({
      type: LOGIN_ERROR,
      payload: "Invalid email or password"
    })
  }
}

// update existing user-info
export const updateUser = ({
  _id,
  username,
  email,
  password,
  access,
  history
}) => async dispatch => {
  try {
    const response = await axios.patch(`${ROOT_URL}/update/${_id}`, {
      _id,
      username,
      email,
      password,
      access
    })
    dispatch({
      type: UPDATE_USER,
      payload: response.data.message
    })
    history.push("/update-success")
  } catch ({ response }) {
    dispatch({
      type: UPDATE_ERROR,
      payload: response.data.error
    })
  }
}

// delete existing user
export const deleteUser = (id, { history }) => async dispatch => {
  try {
    const response = await axios.delete(`${ROOT_URL}/delete`, {
      params: { id }
    })
    dispatch({
      type: DELETE_USER,
      payload: response.data.message
    })
    history.push("/delete-success")
  } catch ({ response }) {
    dispatch({
      type: DELETE_ERROR,
      payload: response.data.error
    })
  }
}

// Fetch the list of users currently authorized
export const fetchUsers = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/users`)

  dispatch({
    type: FETCH_USERS,
    payload: response.data
  })
}

// Get the user authorization of authenticated user
export const fetchUserAccess = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/user-access`, {
    headers: { authorization: localStorage.getItem("token") }
  })

  dispatch({
    type: FETCH_DATA,
    payload: response.data
  })
}

// Remove the token & logout the user
export const logoutUser = () => {
  localStorage.removeItem("token")
  return { type: UNAUTH_USER }
}

// Remove dangling error messages on route change
export const routeChange = () => ({ type: REMOVE_ERROR })
