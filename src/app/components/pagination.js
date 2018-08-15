import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Pagination from "react-js-pagination"

import { fetchUserAccess, fetchUsers } from "../actions"

class PaginationItems extends Component {
  state = { activePage: 1 }

  componentDidMount() {
    this.props.fetchUserAccess()
    this.props.fetchUsers()
  }

  componentDidUpdate(prevProps) {
    prevProps.allItems !== this.props.allItems && this.setState({ activePage: 1 })
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber })
  }

  render() {
    const { activePage } = this.state
    const { allItems, itemsPerPage, pageRange } = this.props
    const totalItems = allItems && allItems.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const offset = (activePage - 1) * itemsPerPage
    const currentItems =
      allItems && allItems.length > 0 && allItems.slice(offset, offset + itemsPerPage)

    if (totalItems === 0) return null

    const headerClass = ["text-dark py-2 pr-4 m-0", activePage ? "border-gray border-right" : ""]
      .join(" ")
      .trim()

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row">
          <div className="w-100 px-4 py-2 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination
                hideDisabled
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalItems}
                pageRangeDisplayed={pageRange}
                onChange={this.handlePageChange}
              />
            </div>
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{totalItems}</strong>{" "}
                {this.props.location.pathname === "/flags" ? "Countries" : "Users"}
              </h2>
              {activePage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{activePage}</span> /{" "}
                  <span className="font-weight-bold">{totalPages}</span>
                </span>
              )}
            </div>
          </div>
          {this.props.render(currentItems)}
        </div>
      </div>
    )
  }
}

export default withRouter(
  connect(
    null,
    { fetchUserAccess, fetchUsers }
  )(PaginationItems)
)
