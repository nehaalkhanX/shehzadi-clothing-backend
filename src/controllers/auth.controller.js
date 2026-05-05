const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklist.model')


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}
/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access public
 */

async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password"
      })
    }

    const isUserAlreadyExits = await userModel.findOne({ email })

    if (isUserAlreadyExits) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email address"
      })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
      name,
      email,
      password: hash
    })

    // Fixed: changed user.username to user.name
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "100d" }
    )

    res.cookie("token", token, {
      httpOnly: true, // Recommended for security
      secure: process.env.NODE_ENV === "production"
    })

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error("Registration Error:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

/**
 * @name loginUserController
 * @description login user, expects email and password
 * @access public
 */

async function loginUserController(req, res) {

  const { email, password } = req.body;

  const user = await userModel.findOne({ email })

  if (!user) {
    return res.status(400).json({
      message: "Invalid user or password"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid user or password"
    })
  }

  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "100d" }
  )

  res.cookie("token", token)

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  })


}

/**
 * @route logoutUserController
 * @description logout user and add token to blacklis
 * @access public
 */

async function logoutUserController(req, res) {

  const { token } = req.cookies.token

  if (token) {
    await blacklistTokenModel.create({ token })
  }

  res.clearCookie("token")

  res.status(200).json({
    message: "User logged out successfully"
  })
}


/**
 * @route adminLoginController
 * @description get admin user details
 * @access private
 */

async function adminLoginController(req, res) {

  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token
    })
  } else {
    res.status(400).json({
      message: "Invalid admin credentials"
    })
  }
}


module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  adminLoginController
}
