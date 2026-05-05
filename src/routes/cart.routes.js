const express = require('express');
const { addToCart, getUserCart, updateCart } = require('../controllers/cart.controller.js');
const authUser = require('../middlewares/auth.js');


const cartRouter = express.Router();

// All cart routes require user authentication
cartRouter.post('/get', authUser, getUserCart);
cartRouter.post('/add', authUser, addToCart);
cartRouter.post('/update', authUser, updateCart);

module.exports = cartRouter;