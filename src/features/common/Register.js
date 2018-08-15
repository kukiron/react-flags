import React, { Component } from "react"
import { connect } from "react-redux"

import { signupUser } from "../../app/actions"
import { validateForm } from "../../app/helpers/validateForm"
import { TextInput, PasswordInput } from "../../app/components/formElements"
import { SubmitButton, CancelButton } from "../../app/components/buttons"
import { Error } from "../../app/components/error"

class Register extends Component {
  state = { username: "", email: "", password: "", error: "" }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, email, password } = this.state
    const { signupUser, history } = this.props

    this.setState({ error: validateForm({ email, password, username }) })
    setTimeout(() => {
      !this.state.error && signupUser({ username, email, password, access: "User", history })
    }, 0)
  }

  handleCancel = () => {
    this.props.history.push("/")
  }

  render() {
    const { username, email, password, error } = this.state
    return (
      <div className="form-container">
        <h2>Register</h2>
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <TextInput name="username" value={username} onChange={this.handleChange} />
          <TextInput name="email" value={email} onChange={this.handleChange} />
          <PasswordInput name="password" value={password} onChange={this.handleChange} />

          <Error error={error || this.props.signupErrorMsg} />
          <SubmitButton userData={this.state} />
          <CancelButton onCancel={this.handleCancel} />
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ errors: { signupErrorMsg } }) => ({
  signupErrorMsg
})

export default connect(
  mapStateToProps,
  { signupUser }
)(Register)
