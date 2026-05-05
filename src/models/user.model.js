const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: [true, "An account already exits with this email adress"],
    required: true
  },
  password: {
    type: String,
    required: true
  }
  ,
  cartData: {
    type: Object,
    default: {}
  }
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;