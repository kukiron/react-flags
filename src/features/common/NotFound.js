import React from "react"
import { Link } from "react-router-dom"

// Set component for unmatched path
export default ({ location }) => (
  <div className="text-center my-5 py-5">
    <h1 className="my-5">
      <span role="img" aria-label="Confused emoji">
        😕{" "}
      </span>
      No match for the path <code>{location.pathname}</code>{" "}
    </h1>
    <div className="d-flex justify-content-center align-items-center">
      <p className="h4 mx-2">Find your way</p>
      <Link to="/" className="btn btn-raised btn-default p-2">
        <h5 className="d-flex">
          <i className="material-icons">home</i>
          Back to Home
        </h5>
      </Link>
    </div>
  </div>
)
