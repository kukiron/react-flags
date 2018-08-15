import React, { Component } from "react"
import { connect } from "react-redux"

import { addUser } from "../../app/actions"
import { validateForm } from "../../app/helpers/validateForm"
import { SubmitButton, CancelButton } from "../../app/components/buttons"
import { TextInput, PasswordInput } from "../../app/components/formElements"
import { Select } from "../../app/components/selectField"
import { Error } from "../../app/components/error"

class Register extends Component {
  state = { username: "", email: "", password: "", access: "", error: "" }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleCancel = () => {
    this.props.history.push("/flags")
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, email, password, access } = this.state
    const { addUser, history } = this.props

    this.setState({ error: validateForm({ email, password, username }) })
    setTimeout(() => {
      !this.state.error && addUser({ username, email, password, access, history })
    }, 0)
  }

  render() {
    const { email, password, username, error } = this.state
    return (
      <div className="form-container">
        <h2>Add new user</h2>
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <TextInput name="username" value={username} onChange={this.handleChange} />
          <TextInput name="email" value={email} onChange={this.handleChange} />
          <PasswordInput name="password" value={password} onChange={this.handleChange} />
          <Select access={this.state.access} onChange={this.handleChange} />

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
  { addUser }
)(Register)
