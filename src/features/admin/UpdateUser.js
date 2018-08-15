import React, { Component } from "react"
import { connect } from "react-redux"

import { updateUser } from "../../app/actions"
import { SubmitButton, CancelButton } from "../../app/components/buttons"
import { validateForm } from "../../app/helpers/validateForm"
import { TextInput, PasswordInput } from "../../app/components/formElements"
import { Select } from "../../app/components/selectField"
import { Error } from "../../app/components/error"

class UpdateUser extends Component {
  constructor(props) {
    super(props)
    const { username, email, password, access } = props.location.state
    this.state = { username, email, password, access, error: "" }
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleCancel = () => {
    this.props.history.push("/users")
  }

  handleSubmit = e => {
    e.preventDefault()
    const { _id } = this.props.location.state
    const { username, email, password, access } = this.state
    const { updateUser, history } = this.props

    this.setState({ error: validateForm({ email, password, username }) })
    setTimeout(() => {
      !this.state.error && updateUser({ _id, username, email, password, access, history })
    }, 0)
  }

  render() {
    const { email, password, username, error } = this.state
    return (
      <div className="form-container">
        <h2>Update account</h2>
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <TextInput name="username" value={username} onChange={this.handleChange} />
          <TextInput name="email" value={email} onChange={this.handleChange} />
          <PasswordInput name="password" value={password} onChange={this.handleChange} />
          <Select access={this.state.access} onChange={this.handleChange} />

          <Error error={error || this.props.updateErrorMsg} />
          <SubmitButton userData={this.state} />
          <CancelButton onCancel={this.handleCancel} />
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ errors: { updateErrorMsg } }) => ({
  updateErrorMsg
})

export default connect(
  mapStateToProps,
  { updateUser }
)(UpdateUser)
