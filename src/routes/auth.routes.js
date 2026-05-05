const express = require('express')
const authController = require('../controllers/auth.controller')


const authRouter = express.Router()

/**
 * @route POST /api/auth/resiter
 * @description register a new user
 * @access public
 */

authRouter.post("/register", authController.registerUserController)


/**
  * @route POST /api/auth/register
  * @description login user with email and password
  * @access public
  */

authRouter.post("/login", authController.loginUserController)


/**
 * @route GET api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 */

authRouter.get("/logout", authController.logoutUserController)


/**
 * @route GET api/auth/admin
 * @description get admin user details
 * @access private
 */

authRouter.post("/admin", authController.adminLoginController)


module.exports = authRouter;