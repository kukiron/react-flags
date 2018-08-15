import React, { Component } from "react"
import { connect } from "react-redux"

import { fetchUsers } from "../actions"

// HOC: protect routes for Admin auth'd paths
export default ComposedComponent => {
  class RequireAdmin extends Component {
    componentWillMount() {
      this.props.fetchUsers()
      const { userAccess, history } = this.props
      userAccess !== "Admin" && history.push("/flags")
    }

    componentWillUpdate(nextProps) {
      const { history } = this.props
      nextProps.userAccess !== "Admin" && history.push("/flags")
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = ({ users: { userAccess } }) => ({ userAccess })

  return connect(
    mapStateToProps,
    { fetchUsers }
  )(RequireAdmin)
}
