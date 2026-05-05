const express = require('express');
const productController = require('../controllers/product.controller');
const upload = require('../middlewares/multer');
const adminAuth = require('../middlewares/adminAuth');

const productRouter = express.Router();

/**
 * @route POST /api/product/add
 * @description create a new product, expects name, description, price and category in the request body
 * @access public
 */

productRouter.post("/add", adminAuth, upload.fields([
    {name: "image1", maxCount: 1},
    {name: "image2", maxCount: 1},
    {name: "image3", maxCount: 1},
    {name: "image4", maxCount: 1},
    {name: "image5", maxCount: 1}
]) , productController.createProductController);

/**
 * @route GET /api/product/all
 * @description get all products
 * @access public
 */ 

productRouter.get("/all", productController.getAllProductsController);

/**
 * @route GET /api/product/:id
 * @description get a single product by id, expects id in the request params
 * @access public
 */ 

productRouter.get("/single", productController.getSingleProductController);

/**
 * @route DELETE /api/product/:id
 * @description remove a product by id, expects id in the request params
 * @access public
 */

productRouter.delete("/remove", adminAuth, productController.removeProductController);

module.exports = productRouter;