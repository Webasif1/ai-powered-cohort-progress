const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  fakeOriginalPrice: {
    type: Number,
    required: [true, "Please enter fake original price"],
  },
  image: {
    type: String,
    required: [true, "Please enter image URL"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter stock"],
  },
  rating: {
    type: Number,
    required: [true, "Please enter rating"],
  },
  fakeReviews: {
    type: Number,
    required: [true, "Please enter fake reviews"],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
