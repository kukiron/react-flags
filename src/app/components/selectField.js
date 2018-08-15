import React from "react"

export const Select = ({ access, onChange }) => (
  <div className="form-group">
    <select name="access" value={access} className="form-control" onChange={onChange}>
      <option value="" disabled>
        Select user access
      </option>
      <option value="User">User</option>
      <option value="Admin">Admin</option>
    </select>
  </div>
)
