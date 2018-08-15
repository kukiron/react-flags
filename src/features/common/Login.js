import React, { Component } from "react"
import { connect } from "react-redux"

import { loginUser } from "../../app/actions"
import { TextInput, PasswordInput } from "../../app/components/formElements"
import { SubmitButton, CancelButton } from "../../app/components/buttons"
import { Error } from "../../app/components/error"

class Login extends Component {
  state = { email: "", password: "" }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    const { loginUser, history } = this.props
    loginUser({ email, password, history })
  }

  handleCancel = () => {
    this.props.history.push("/")
  }

  render() {
    const { email, password } = this.state
    return (
      <div className="form-container">
        <h2>Login</h2>
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <TextInput name="email" value={email} onChange={this.handleChange} />
          <PasswordInput name="password" value={password} onChange={this.handleChange} />
          <Error error={this.props.loginErrorMsg} />
          <SubmitButton />
          <CancelButton onCancel={this.handleCancel} />
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ errors: { loginErrorMsg } }) => ({
  loginErrorMsg
})

export default connect(
  mapStateToProps,
  { loginUser }
)(Login)
