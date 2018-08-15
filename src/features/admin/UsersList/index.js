import React, { PureComponent } from "react"
import { connect } from "react-redux"

import UserInfo from "./UserInfo"
import SearchBox from "./SearchBox"
import PaginationItems from "../../../app/components/pagination"
import { Error } from "../../../app/components/error"
import { deleteUser, fetchUsers } from "../../../app/actions"
import { filterItems } from "../../../app/helpers/filterItems"

class UsersList extends PureComponent {
  state = { value: "", users: [] }

  componentDidUpdate(prevProps) {
    this.props.usersList !== prevProps.usersList && this.setState({ users: this.props.usersList })
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleDelete = id => {
    const { deleteUser, history } = this.props
    deleteUser(id, { history })
  }

  handleUpdate = user => {
    this.props.history.push(`/update/${user._id}`, user)
  }

  handleSearch = value => e => {
    e.preventDefault()
    const users = filterItems(value, this.props.usersList)
    this.setState({ users })
  }

  render() {
    return (
      <div>
        <SearchBox
          value={this.state.value}
          onChange={this.handleChange}
          onSearch={e => this.handleSearch(e)}
        />

        <PaginationItems
          allItems={this.state.users}
          itemsPerPage={5}
          pageRange={3}
          render={currentUsers => (
            <div className="user-list my-2 mx-auto">
              <Error error={this.props.deleteErrorMsg} />
              <ul>
                <UserInfo
                  users={currentUsers}
                  onDelete={this.handleDelete}
                  onUpdate={this.handleUpdate}
                />
              </ul>
            </div>
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = ({
  users: { usersList },
  errors: { deleteErrorMsg },
  auth: { updateSuccess }
}) => ({
  usersList,
  deleteErrorMsg,
  updateSuccess
})

export default connect(
  mapStateToProps,
  { deleteUser, fetchUsers }
)(UsersList)
