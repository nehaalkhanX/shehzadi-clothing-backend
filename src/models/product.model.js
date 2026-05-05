const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image : {
        type: Array,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    sizes: {
        type: Array,
        required: true
    },
    price : {
        type: Number,
        required: true,
    },
    category : {
        type: String,
        required: true,
    },
    bestseller : {
        type: Boolean,
    }
})

const productModel = mongoose.model("product", productSchema)

module.exports = productModel;

