import React from "react"

const UserInfo = ({ users, onDelete, onUpdate }) => {
  if (!users) return <h4>Loading...</h4>

  return users.map(user => (
    <div key={user._id}>
      <li className="user d-flex justify-content-flex-start align-items-center list-unstyled p-2">
        <div>
          <i className="material-icons mx-4">person_pin</i>
        </div>
        <div>
          <span className="h5">{user.username}</span>
          <p>{`Email: ${user.email}`}</p>
          <p>{`Access Level: ${user.access}`}</p>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn btn-raised btn-info update-btn px-2 py-1 "
            onClick={() => onUpdate(user)}
          >
            Update
          </button>
          <button
            className="btn btn-raised btn-danger px-2 py-1"
            onClick={() => onDelete(user._id)}
          >
            Delete
          </button>
        </div>
      </li>
      <hr />
    </div>
  ))
}

export default UserInfo
