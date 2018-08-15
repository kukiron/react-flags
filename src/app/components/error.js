import React from "react"

export const Error = ({ error }) =>
  error ? <div className="alert alert-danger">{error}</div> : null
