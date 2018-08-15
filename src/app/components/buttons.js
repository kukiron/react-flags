import React from "react"

export const CancelButton = ({ onCancel }) => (
  <button type="button" className="btn btn-raised btn-default" onClick={onCancel}>
    Cancel
  </button>
)

export const SubmitButton = ({ userData }) => {
  let allNotSelected
  if (userData) {
    const { email, password, username } = userData
    allNotSelected = email === "" || password === "" || username === ""
  }

  return (
    <button type="submit" className="btn btn-raised btn-primary" disabled={allNotSelected}>
      Submit
    </button>
  )
}
