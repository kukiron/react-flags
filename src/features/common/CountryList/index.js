import React, { Component } from "react"
import Countries from "countries-api/lib/data/Countries.json"

import CountryCard from "./CountryCard"
import PaginationItems from "../../../app/components/pagination"

class CountryList extends Component {
  render() {
    return (
      <div>
        <PaginationItems
          allItems={Countries}
          itemsPerPage={18}
          pageRange={4}
          render={currentCountries =>
            currentCountries.map(country => <CountryCard key={country.cca3} country={country} />)
          }
        />
      </div>
    )
  }
}

export default CountryList
