const jwt = require("jwt-simple")
const config = require("../config")
const User = require("../models/user")

const tokenForUser = user => {
  const timestamp = new Date().getTime()
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp
    },
    config.secret
  )
}

// If user has email & password auth'd we need to give them a token
exports.login = (req, res) => {
  res.send({ token: tokenForUser(req.user) })
}

// Signup new users
exports.signup = (req, res, next) => {
  const { username, email, password, access } = req.body

  if (!access)
    return res
      .status(422)
      .send({ error: "You must provide user access priviledge" })

  // see if a user with a given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err)
    // if so, return error
    if (existingUser) return res.status(422).send({ error: "Email is in use" })

    // if not, create & save user record
    const user = new User({
      username,
      email,
      password,
      access
    })
    // respond to request indicating the user was created
    user.save(err => {
      err ? next(err) : res.send({ token: tokenForUser(user) })
    })
  })
}

// Update an existing user-info
exports.update = async (req, res, next) => {
  const { _id, username, email, password, access } = req.body
  const body = { username, email, password, access }

  if (!access || !email || !password || !username)
    return res.status(422).send({ error: "You must provide all the user info" })

  try {
    const user = await User.findOneAndUpdate(
      { _id },
      { $set: body },
      { new: true, runValidators: true }
    )
    !user
      ? res
          .status(404)
          .send({ error: "Bad request! The user cannot be updated" })
      : res.send({ message: "Successfully updated the user", user })
  } catch (err) {
    next(err)
  }
}

// Delete a user by admin
exports.delete = async (req, res, next) => {
  const { id } = req.query

  // see if the user with given name exists
  try {
    const doc = await User.findByIdAndRemove(id).exec()
    !doc
      ? res.status(422).send({ error: "Bad request! The user cannot be found" })
      : res
          .status(200)
          .send({ message: "The user account is successfully deleted" })
  } catch (err) {
    next(err)
  }
}
