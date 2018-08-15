import React, { Component } from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"

import "./navbar.css"

class NavBar extends Component {
  // Navbar for authenticated users
  authenticatedUser() {
    return [
      <li key={1}>
        <NavLink to="/flags">Flags</NavLink>
      </li>,
      <li key={2}>
        <NavLink to="/logout">Logout</NavLink>
      </li>
    ]
  }

  // Navbar for unauthenticated users
  unauthenticatedUser() {
    return [
      <li key={1}>
        <NavLink to="/login">Login</NavLink>
      </li>,
      <li key={2}>
        <NavLink to="/register">Register</NavLink>
      </li>
    ]
  }

  // Navigation link only for Admin to create & delete user
  adminNavLink() {
    const { authenticated, userAccess } = this.props

    if (authenticated && userAccess === "Admin") {
      return (
        <li className="dropdown">
          <a>
            Admin <span className="arrow">&#9660;</span>
          </a>
          <ul className="sub-menu">
            <li>
              <NavLink to="/add-user">Add User</NavLink>
            </li>
            <li>
              <NavLink to="/users">User List</NavLink>
            </li>
          </ul>
        </li>
      )
    }
  }

  render() {
    const { authenticated } = this.props
    return (
      <div className="menu">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {authenticated ? this.authenticatedUser() : this.unauthenticatedUser()}
          {this.adminNavLink()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ auth: { authenticated }, users: { userAccess } }) => ({
  authenticated,
  userAccess
})

export default connect(mapStateToProps)(NavBar)
