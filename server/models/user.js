const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Define our model
const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  access: String
})

// method to compare password to the existing one
userSchema.methods.comparePassword = function(userPassword, callback) {
  if (!userPassword || !this.password)
    return callback("Password is not correct")

  const res = userPassword === this.password
  callback(null, res)
}

// Create the model class
const User = mongoose.model("user", userSchema)

// Export the model
module.exports = User
