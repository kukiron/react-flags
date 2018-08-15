import React, { Component } from "react"
import { connect } from "react-redux"

// HOC: protect routes for logged in users
export default ComposedComponent => {
  class RequireAuth extends Component {
    componentWillMount() {
      const { authenticated, history } = this.props
      !authenticated && history.push("/")
    }

    componentWillUpdate(nextProps) {
      const { history } = this.props
      !nextProps.authenticated && history.push("/")
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = ({ auth: { authenticated } }) => ({ authenticated })

  return connect(mapStateToProps)(RequireAuth)
}
