const express = require('express');
const { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyRazorpay } = require('../controllers/order.controller.js');
const adminAuth = require('../middlewares/adminAuth.js');
const authUser = require('../middlewares/auth.js');

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// Verify Payment
orderRouter.post('/verify-razorpay', authUser, verifyRazorpay);

// User Feature
orderRouter.post('/userorders', authUser, userOrders);

module.exports = orderRouter;