import React, { Component } from "react"
import { connect } from "react-redux"

import { logoutUser } from "../../app/actions"

class Signout extends Component {
  componentWillMount() {
    this.props.logoutUser()
  }

  render() {
    return (
      <div className="text-center my-5 py-4">
        <img src="/assets/images/user-logout.png" alt="logged out" />
        <h1 className="my-5">You are logged out</h1>
      </div>
    )
  }
}

export default connect(
  null,
  { logoutUser }
)(Signout)
