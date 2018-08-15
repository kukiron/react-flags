import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { routeChange } from "../actions"

// HOC: wraps the entire app to check for route change & remove dangling errors
export default ComposedComponent => {
  class RouteChangeWrapper extends Component {
    componentWillReceiveProps(nextProps) {
      const { routeChange, location } = this.props
      location.pathname !== nextProps.location.pathname && routeChange()
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  return withRouter(
    connect(
      null,
      { routeChange }
    )(RouteChangeWrapper)
  )
}
