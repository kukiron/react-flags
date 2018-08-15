const express = require("express")
const http = require("http")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")
const router = require("./router")

const app = express()

// DB setup
mongoose.connect(
  process.env.MONGODB_URI,
  // For running server on local machine setup mongodb & update uri to the following
  // "mongodb://localhost:27017/react-flags",
  { useNewUrlParser: true }
)

// App setup with express middlewares
app.use(morgan("combined"))
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json({ type: "*/*" }))
app.use(cors())
app.options("*", cors())

// Set up the static file path
app.use(express.static(__dirname))

router(app)

// Server setup
const port = process.env.PORT || 3090,
  server = http.createServer(app)

// Listening to the port
server.listen(port, () => {
  console.log(`🌍 Express server is up and running on port: ${port} 🐎`)
})
