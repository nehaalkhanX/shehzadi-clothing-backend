const productModel = require('../models/product.model');
const cloudinary = require('cloudinary').v2;

/**
 * @name createProductController
 * @description create a new product, expects name, description, price and category in 
 *  in the request body
 * @access public
 */

async function createProductController(req, res) {

  const { name, description, price, category, sizes, bestseller } = req.body;

  if (!name || !description || !price || !category || !sizes) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0]; 
  const image4 = req.files.image4 && req.files.image4[0];
  const image5 = req.files.image5 && req.files.image5[0];

  const images = [image1, image2, image3, image4, image5].filter((image) => image !== undefined);

  let imageUrl = await Promise.all(
    images.map(async (image) => {
      let result = await cloudinary.uploader.upload(
        image.path, {resource_type: 'image'}
      )
      return result.secure_url;
    })
  )

  console.log(imageUrl);


  const product = await productModel.create({
    image: imageUrl,
    name,
    description,
    sizes: JSON.parse(sizes),
    price: Number(price),
    category,
    bestseller: bestseller === "true" ? true : false
  })

  res.status(201).json({
    success: true,
    message: "Product added successfully",
    product: {
      id: product._id,
      image: product.image,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      sizes: product.sizes,
      bestseller: product.bestseller
    }
  })

}

/**
 * @name getAllProductsController
 * @description get all products
 * @access public
 */

async function getAllProductsController(req, res) {

  const products = await productModel.find({});

  res.status(200).json({
    success: true,
    message: "Products fetched successfully", products})
}

/**
 * @name getSingleProductController
 * @description get a single product by id, expects id in the request params
 * @access public
 */
async function getSingleProductController(req, res) {

  const product = await productModel.findById(req.body.id);

  res.status(200).json({
    success: true,
    message: "Product fetched successfully", product})
}

/**
 * @name removeProductController
 * @description remove a product by id, expects id in the request params
 * @access public
 */

async function removeProductController(req, res) {

  const product = await productModel.findByIdAndDelete(req.body.id);

  res.status(200).json({
    success: true,
    message: "product removed succesfully", 
    product
  })
}

module.exports = {
  createProductController,
  getAllProductsController,
  getSingleProductController,
  removeProductController
}