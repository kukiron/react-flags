import React from "react"

export const TextInput = ({ name, value, onChange }) => (
  <div className="form-group">
    <label>{name === "username" ? "Name" : "Email"}</label>
    <input type="text" name={name} className="form-control" value={value} onChange={onChange} />
  </div>
)

export const PasswordInput = ({ name, value, onChange }) => (
  <div className="form-group">
    <label>Password</label>
    <input type="password" name={name} className="form-control" value={value} onChange={onChange} />
  </div>
)
