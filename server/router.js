const path = require("path")
const passport = require("passport")
const Requests = require("./controllers/requests")
const User = require("./models/user")

require("./services/passport")

const requireAuth = passport.authenticate("jwt", { session: false }),
  requireLogin = passport.authenticate("local", { session: false })

module.exports = app => {
  // View engine
  app.set("view engine", "ejs")
  app.set("views", path.resolve(__dirname, "views"))

  // Sample welcome page
  app.get("/", (req, res) => {
    res.render("index", { title: "React-Flags API" })
  })

  // Get users list, no auth required
  app.get("/users", (req, res) => {
    User.find({}, (err, users) => {
      res.send(users)
    })
  })

  // Get the current user's access level
  app.get("/user-access", requireAuth, (req, res) => {
    res.send(req.user.access)
  })

  // Login & Signup requests
  app.post("/login", requireLogin, Requests.login)
  app.post("/signup", Requests.signup)

  // Update existing user
  app.patch("/update/:id", Requests.update)

  // Delete an existing user
  app.delete("/delete", Requests.delete)
}
