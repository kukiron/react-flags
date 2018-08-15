import React from "react"

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="my-5">
        <span role="img" aria-label="world-emoji">
          🌎
        </span>{" "}
        Hello World!
      </h1>
      <br />
      <img src="/assets/images/world-map.png" alt="world map" />
      <br />
      <h4 className="my-5">Login or Register to see flags of all the countries</h4>
    </div>
  )
}

export default Home
