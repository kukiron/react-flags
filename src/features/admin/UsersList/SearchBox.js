import React from "react"

const SearchBox = ({ value, onSearch, onChange }) => {
  return (
    <div>
      <form
        className="w-50 d-flex justify-content-center align-items-center my-0 mx-auto"
        onSubmit={onSearch(value)}
      >
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={onChange}
          placeholder="Type username or email..."
        />
        <button className="btn btn-default d-flex justify-content-center align-items-center mx-2">
          <i className="material-icons">search</i> Search
        </button>
      </form>
    </div>
  )
}

export default SearchBox
